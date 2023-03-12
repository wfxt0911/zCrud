
<script>
import get from 'lodash.get'
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
      loading: false
    };
  },
  computed: {
    $z() {
      return {
        setFormItemData: this.setFormItemData,
        getParam: this.getParam,
        showLoading: this.showLoading,
        hideLoading: this.hideLoading
      }
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },


  methods: {
    deepCopy, isUndefined, get,
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
    getFormItemData(){
      if (!this.$attrs.formItemOption) throw new Error('formItemOption参数不参在，无法设置')
      console.log(this.$attrs.formItemOption);
    },
    setFormItemData() {
      if (!this.$attrs.formItemOption) throw new Error('formItemOption参数不参在，无法设置')
      console.log(this.$attrs.formItemOption);

    },
    getParam() {
      const _attrs_query = this.get(this.$attrs, 'searchOption.query', {})
      let query = {}
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
