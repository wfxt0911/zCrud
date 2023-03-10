<template>
  <div class='z-search ' v-if="isShowSearch">
    <el-form ref="form" :model="query" v-bind="$attrs" :labelWidth="handleAttribute($attrs.labelWidth, '100px')"
      :size="handleAttribute($attrs.size, defaultSize)">
      <z-form-all-item :mode="mode" :formData="query" :gutter="$attrs.gutter"
        :size="handleAttribute($attrs.size, defaultSize)"></z-form-all-item>
    </el-form>
    <div class="z-search__btns">
      <el-button :size="handleAttribute($attrs.size, defaultSize)" type="primary" @click="search">查询</el-button>
      <el-button :size="handleAttribute($attrs.size, defaultSize)" @click="searchReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import zFormAllItem from './z-form-all-item.vue'
import { MODE } from '../constants/index'
export default {
  name: 'z-search',
  components: { zFormAllItem },
  props: {
    query: {
      type: Object,
      default: () => { }
    }
  },
  inject: ['handleAttribute', 'deepCopy'],
  data() {
    return {
      mode: MODE.SEARCH,
      defaultSize: 'small',
      defaultQuery: undefined
    };
  },

  computed: {
    isShowSearch() {
      return this.query && this.query != {}
    }
  },
  mounted() {
    this.defaultQuery = this.deepCopy(this.query)
  },

  destroyed() { },

  methods: {
    searchReset() {
      this.$parent.$attrs.searchOption.query = this.deepCopy(this.defaultQuery)
      this.$parent?.$emit('search-reset')
    },
    search() {
      let query = {}
      Object.keys(this.query).forEach(key => {
        query[key] = this.query[key].value
      })
      this.$parent?.$emit('search', query)
    }
  }
}

</script>
<style lang='scss' scoped>
.z-search {
  display: flex;
  padding: 12px;

  .el-form {
    flex: 1;
  }

  &__btns {
    margin-left: 12px;
    // padding: 12px;
    // display: flex;
    // align-items: top;

  }
  ::v-deep .el-form-item__label{
    font-weight: 500;
  }
}
</style>
