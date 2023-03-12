<template>
  <div class='z-crud-demo hidden-container'>
    <zCrud ref="zCrud" v-bind="options"  @search-reset="searchReset"
      @search="search" @remove="remove" @pagination-size-change="paginationSizeChange"
      @pagination-current-change="paginationcurrentChange" @before-edit="beforeEdit" @multiple-remove="multipleRemove">
      <template #category="{ row }">{{ categoryFormat(row.category) }}</template>
    </zCrud>
  </div>
</template>

<script>
import { getList } from '@/api/goods'
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
    this.getList()
  },

  destroyed() { },

  methods: {
    searchReset() {
    },
    search(query) {
      this.getList()
    },
    paginationSizeChange() {
      this.getList()
    },
    paginationcurrentChange() {
      this.getList()
    },
    beforeEdit({ row, index }) {
      // this.$refs.zCrud.setFormItemData()
    },
    async getList() {

      const param = this.$refs.zCrud.$z.getParam()
      this.$refs.zCrud.$z.showLoading()
      const res = await getList({ ...this.options.paginationOption, ...param })
      this.options.data = res.data.list
      this.options.paginationOption.total = res.data.total
      this.$refs.zCrud.$z.hideLoading()
    },
    remove({ id }) {
      //模拟接口删除
      // 删除后重新请求下数据
      this.getList()
      this.$notify.success({ title: '提示', message: '删除成功' })

    },
    multipleRemove(selection) {
      //模拟接口删除
      // 删除后重新请求下数据
      this.getList()
      this.$notify.success({ title: '提示', message: '删除成功' })
    },
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
