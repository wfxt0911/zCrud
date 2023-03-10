<template>
  <div class='z-toolbar'>
    <div class="z-toolbar__left">123</div>
    <div class="z-toolbar__right">

      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button icon="el-icon-refresh-right" circle :size="functionButtionSize"></el-button>
      </el-tooltip>


      <el-tooltip content="显示/隐藏查询" placement="bottom" effect="light">
        <el-button type="primary" icon="el-icon-search" circle :size="functionButtionSize"></el-button>
      </el-tooltip>
      <el-tooltip content="列设置" placement="bottom" effect="light">
        <el-button type="primary" icon="el-icon-view" circle :size="functionButtionSize"></el-button>
      </el-tooltip>



    </div>
  </div>
</template>

<script>
export default {
  name: 'z-toolbar',
  components: {},
  data() {
    return {
      functionButtionSize: 'small'
    };
  },


  mounted() { },

  destroyed() { },

  methods: {}
}

</script>
<style lang='scss' scoped>
@import '../z-curd.scss';

.z-toolbar {
  // border-top: 1px solid $border_color;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_left {
    flex: 1;
  }

  &_right {}

}
</style>
