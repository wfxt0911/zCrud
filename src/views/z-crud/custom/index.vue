<template>
  <div class='z-crud-demo hidden-container'>
    <zCrud ref="zCrud" v-bind="options" @save="save" @search="search" @search-reset="searchReset" @remove="remove"
      @multiple-remove="multipleRemove" @pagination-size-change="paginationSizeChange"
      @pagination-current-change="paginationcurrentChange" @before-edit="beforeEdit">
      <!-- 插槽格式化文案 -->
      <template #category="{ row }">{{ categoryFormat(row.category) }}</template>
    </zCrud>
  </div>
</template>

<script>


import { getList, getDetailById } from '@/api/goods'
import options from './options'
export default {
  name: 'z-crud-demo',
  components: {},
  data() {
    return {
      options
    };
  },


  mounted() {
    this.$notify.success({ title: '提示', message: '此示例使用了一个自定义的验证码组件，请点击新增或者编辑查看', duration: 10 * 1000 })
    this.getList()
  },

  destroyed() { },

  methods: {
    //重置搜索条件的事件，内部会将分页参数重置
    searchReset() {
      this.getList()
    },
    // 搜索事件
    search() {
      this.getList()
    },
    /**分页Size改变事件 ，内部会更改分页的pageSize，您无需手动更改*/
    paginationSizeChange() {
      this.getList()
    },
    /**分页currentPage改变事件 ，内部会更改分页的currentPage，您无需手动更改*/
    paginationcurrentChange() {
      this.getList()
    },
    //点击编辑打开弹窗之前的事件，用来从后端获取数据到form表单
    beforeEdit({ row, index }) {
      const { id } = row
      id && this.getDetail(id)
    },
    /**从后端获取列表数据 */
    async getList() {
      // 因为我们的配置对象是带组件信息的，不能用于参数传与后端，可以通过$z.getParam() 获取到正常的查询参数,
      //并且如果你开启了分页，那么分页参数也会带过来
      const param = this.$refs.zCrud.$z.getParam()
      //内置了一个开启loading的方法
      this.$refs.zCrud.$z.showLoading()
      // 参数与
      const res = await getList(param)
      //将数据给到data
      this.options.data = res.data.list
      //将分页总数给到分页对象
      this.options.paginationOption.total = res.data.total
      //内置了一个关闭loading的方法
      this.$refs.zCrud.$z.hideLoading()
    },
    async getDetail(id) {
      const res = await getDetailById({ id })
      //因为我们的表单配置对象是带组件信息的，可以通过$z.setFormItemData(res.data)转换成正常的表单对象
      this.$refs.zCrud.$z.setFormItemData(res.data)
    },
    //模拟接口删除
    remove({ id }) {
      // 删除后重新请求下数据
      this.getList()
      this.$notify.success({ title: '提示', message: '删除成功' })
    },
    //模拟接口删除
    multipleRemove(selection) {
      // 删除后重新请求下数据
      this.getList()
      this.$notify.success({ title: '提示', message: '删除成功' })
    },

    save({ form, mode }) {
      console.log("🚀 ~ file: index.vue:90 ~ save ~ form:", form)
      if (mode === 'create') {
        //处理新增逻辑，form是表单数据
        this.$notify.success({ title: '提示', message: '新增成功' })
        this.getList()
      } else if (mode === 'edit') {
        //处理编辑逻辑，form是表单数据
        this.$notify.success({ title: '提示', message: '编辑成功' })
        this.getList()
      }

    },
    /**格式化商品分类列 */
    categoryFormat(val) {
      switch (val) {
        case 2:
          return '家电'
        case 3:
          return '家具'
        case 4:
          return '食物'
        default:
          return '未知'
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.z-crud-demo {}
</style>
