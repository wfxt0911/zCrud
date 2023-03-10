<template>
  <div class='z-paper'>
    <!-- 分页 -->
    <el-pagination v-bind="paginationOption" @size-change="handlePaginationSizeChange"
      @current-change="handlePaginationCurrentChange" @prev-click="handlePaginationPrevClick"
      @next-click="handlePaginationNextClick"
      :layout="handleAttribute(paginationOption.layout, 'total, sizes, prev, pager, next, jumper')">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: 'z-paper',
  components: {},
  props: {
    paginationOption: {
      type: Object,
      default: () => { }
    },
  },
  inject: ['handleAttribute'],
  data() {
    return {
    };
  },


  mounted() { },

  destroyed() { },

  methods: {
    //#region ==}========> 分页
    /**
 * @description 每页条数改变
 */
    handlePaginationSizeChange(pageSize) {
      this.$parent.$emit('pagination-size-change', pageSize)
    },
    /**
     * @description 当前页码改变
     */
    handlePaginationCurrentChange(currentPage) {
      this.$parent.$emit('pagination-current-change', currentPage)
    },
    /**
     * @description 上一页
     */
    handlePaginationPrevClick(currentPage) {
      this.$parent.$emit('pagination-prev-click', currentPage)
    },
    /**
     * @description 下一页
     */
    handlePaginationNextClick(currentPage) {
      this.$parent.$emit('pagination-next-click', currentPage)
    }
    //#endregion
  }
}

</script>
<style lang='scss' scoped>
@import '../z-curd.scss';
.z-paper {
  display: flex;
  align-items: center;
  border-top: 1px solid $border_color;
  padding: 10px;
}
</style>
