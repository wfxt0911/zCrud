<template>
  <div class='z-crud-demo hidden-container'>
    <zCrud v-bind="options" @search-item-change="searchItemChange" @search-reset="searchReset" @search="search"
      @edit="edit" @pagination-size-change="paginationSizeChange">
    </zCrud>
  </div>
</template>

<script>
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

    for (let index = 0; index < 30; index++) {
      this.options.data.push(
        {
          name: '李四',
          subject: '语文',
          teacher: '杜甫'
        }
      )
    }
  },

  destroyed() { },

  methods: {
    searchItemChange(row, field) {
    },
    searchReset() {
    },
    search(query) {
    },
    edit({ row, index }) {
      console.log("🚀 ~ file: index.vue:38 ~ edit ~ index:", index)
      console.log("🚀 ~ file: index.vue:38 ~ edit ~ row:", row)

    },
    paginationSizeChange(pageSize) {
      console.log("🚀 ~ file: index.vue:43 ~ paginationSizeChange ~ pageSize:", pageSize)


    }
  }
}

</script>
<style lang='scss' scoped>
.z-crud-demo {}
</style>
