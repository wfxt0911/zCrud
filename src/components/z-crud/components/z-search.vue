<template>
  <transition name="fade">
    <div class='z-search ' v-if="isShowSearch">
      <el-form ref="form" :model="query" v-bind="$attrs" :labelWidth="get($attrs,'labelWidth', '100px')"
        :size="get($attrs,'size', defaultSize)">
        <z-form-all-item :mode="MODE.SEARCH" :formData="query" :gutter="$attrs.gutter"
          :size="get($attrs,'size', defaultSize)"></z-form-all-item>
      </el-form>
      <div class="z-search__btns">
        <el-button :size="get($attrs,'size', defaultSize)" type="primary" @click="search">查询</el-button>
        <el-button :size="get($attrs,'size', defaultSize)" @click="searchReset">重置</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import zFormAllItem from './z-form-all-item.vue'
import {MODE} from '../constants/index'
export default {
  name: 'z-search',
  components: { zFormAllItem },
  props: {
    query: {
      type: Object,
      default: () => { }
    }
  },
  inject: [ 'deepCopy','get'],
  data() {
    return {
      defaultSize: 'small',
      defaultQuery: undefined,
      showSearchFlag: true,
      MODE:MODE
    };
  },

  computed: {
    isShowSearch() {
      return this.query && this.query != {} && this.showSearchFlag
    }
  },
  mounted() {
    this.defaultQuery = this.deepCopy(this.query)
  },

  destroyed() { },

  methods: {
    searchReset() {
      this.$parent.$attrs.searchOption.query = this.deepCopy(this.defaultQuery)
      console.log("🚀 ~ file: z-search.vue:59 ~ search ~ this.$parent.$attrs:", this.$parent.$attrs)
      this.$parent.resetPagination()
      this.$parent?.$emit('search-reset')
    },
    search() {
      this.$parent?.$emit('search')
    }
  }
}

</script>
<style lang='scss' scoped>
.z-search {
  display: flex;
  padding: 12px 0;

  .el-form {
    flex: 1;
  }

  &__btns {
    margin-left: 12px;
    // padding: 12px;
    // display: flex;
    // align-items: top;

  }

  ::v-deep .el-form-item__label {
    font-weight: 500;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .1s;
  opacity: 1;

}

.fade-enter,
.fade-leave-to {
  transform: translateY(-300px);
  opacity: 0;

}
</style>
