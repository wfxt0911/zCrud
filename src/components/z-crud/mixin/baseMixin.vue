
<script>
import get from 'lodash.get'
import set from 'lodash.set'

import { deepCopy, isUndefined } from '../utils/index'
//静态变量
import { MODE } from '../constants/index'
export default {
  name: 'baseMixin',
  props: {
    size: {
      type: String,
      default: 'default'
    },

  },
  provide() {
    return {
      size: this.size,
      deepCopy: this.deepCopy,
      isUndefined: this.isUndefined,
      deleteConfirm: this.deleteConfirm,
      get: this.get,
      set: this.set,
      currentMode: () => this.currentMode
    }
  },
  data() {
    return {
      tableOption: {
        height: undefined
      },
      columns: [],
      isShowDialog: false,
      currentMode: MODE.CREATE,
      loading: false,
      storageFormItemOption: {},
      storagePaginationOption: {},//存储数据,用于重置
      pagination: {},//分页数据
    };
  },
  computed: {
    style() {
      return {
        padding: '20px',
        paddingBottom: this.$attrs.paginationOption ? '0px' : '20px',
      }
    },
    $z() {
      return {
        setFormItemData: this.setFormItemData,
        getParam: this.getParam,
        showLoading: this.showLoading,
        hideLoading: this.hideLoading,
        resetPagination:this.resetPagination,
        resetFormItemOption:this.resetFormItemOption,
        getSelection:this.getSelection
      }
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },


  methods: {
    deepCopy, isUndefined, get, set,
    getTableHeight() {
      if (this.$attrs.tableOption) {
        Object.assign(this.tableOption, this.$attrs.tableOption)
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.$set(this.tableOption, 'height', this.$refs.zTable.$el.offsetHeight)
        }, 200);//需要要延时下，过渡动画延迟了1s
      })
    },
    init() {
      //深拷贝一份原始的分页配置对象,如果没有维护该配置,则会赋值undefined
      this.storagePaginationOption = this.deepCopy(this.$attrs.paginationOption)
      // this.pagination = this.$attrs.paginationOption

      //获取表格高度
      this.getTableHeight()
      // 初始化column，使其具有show默认字段
      this.$attrs.columns.forEach(col => {
        if (this.isUndefined(col.show)) {
          this.$set(col, 'show', true)
        }
      })
    },
    deleteConfirm() {
      return new Promise((resolve, reject) => {
        this.$confirm('数据很重要, 请确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        });
      })
    },

    //#region 暴露方法
    // 重置表单
    resetFormItemOption() {
      this.storageFormItemOption = this.deepCopy(this.get(this.$attrs, 'formItemOption', {}))
      this.$refs.zDialog?.$refs?.form?.clearValidate()
    },
    resetPagination() {
      if (!this.storagePaginationOption) return
      this.$set(this.$attrs.paginationOption, 'currentPage', this.storagePaginationOption.currentPage || 1)
      this.$set(this.$attrs.paginationOption, 'pageSize', this.storagePaginationOption.pageSize || 1)

    },
    getFormItemData() {
      // 目标：需要把带有component的对象，转换成用于传递给后端的正常表单对象
      if (!this.$attrs.formItemOption) throw new Error('formItemOption参数不参在，无法设置')
      return this.$refs.zDialog.formData
    },
    setFormItemData(formData) {
      if (!formData) throw new Error('请传递表单数据')
      // 目标：把从后端获取到的正常表单数据赋值到formItemOption对象(带组件配置参数的对象)
      if (this.storageFormItemOption == {}) throw new Error('formItemOption参数不参在，无法设置')
      // 由于不能保证哪个对象的字段多,只能分两次循环,第一次重置value为undefined,第二次为赋值
      // 一切以后端返回的正常表单数据为准,先重置所有的value为undefined
      Object.keys(this.storageFormItemOption).forEach(key => {
        this.$set(this.storageFormItemOption[key], 'value', undefined)
      })
      //将表单数据赋值给value
      Object.keys(formData).forEach(key => {
        // this.set(this.$attrs.formItemOption[key],'value', formData[key])
        if (!this.storageFormItemOption[key]) {
          // 如果不存在该属性
          this.$set(this.storageFormItemOption, key, { component: { show: false } })

        }
        this.$set(this.storageFormItemOption[key], 'value', formData[key])
      })
    },
    getParam() {
      const _attrs_query = this.get(this.$attrs, 'searchOption.query', {})
      const _currentPage = this.get(this.$attrs, 'paginationOption.currentPage', undefined)
      const _pageSize = this.get(this.$attrs, 'paginationOption.pageSize', undefined)

      let query = {
        currentPage: _currentPage,
        pageSize: _pageSize
      }
      Object.keys(_attrs_query).forEach(key => {
        query[key] = _attrs_query[key].value
      })
      return query
    },
    hideLoading() {
      this.loading = false
    },
    showLoading() {
      this.loading = true
    },
    getSelection() {
      return new Promise((resolve, inject) => {
        const selection = this.$refs.zTable.$refs.elTable.selection
        if (selection.length <= 0) {
          console.log("🚀 ~ file: baseMixin.vue:116 ~ returnnewPromise ~ selection:", selection)
          this.$notify.warning({
            title: '提醒',
            message: '请至少选择一行数据'
          });
          inject(false)
        }
        resolve(selection)
      })
    }
    //#endregion

  }
}

</script>
