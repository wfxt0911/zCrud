<template>
  <div class='z-toolbar' v-if="get(toolbarOption,'show',true)">
    <div class="z-toolbar__left">
      <el-button v-if="get(toolbarOption, 'create.show', true)" :disabled="get(toolbarOption, 'create.disabled', false)"
        v-bind="get(toolbarOption,'create',{})" @click="handleCteate" :size="get(toolbarOption, 'create.size', functionButtionSize)"
        :type="get(toolbarOption, 'create.type', functionDefaultType)">
        {{ get(toolbarOption, 'create.text', '新增') }}
      </el-button>

      <el-button
        v-if="get(toolbarOption, 'multipleRemove.show', true) && get($parent, '$refs.zTable.selectionOption.show', true)"
        :disabled="get(toolbarOption, 'multipleRemove.disabled', false)"  v-bind="get(toolbarOption,'multipleRemove',{})"
        @click="handleMultipleRemove" :size="get(toolbarOption, 'multipleRemove.size', functionButtionSize)"
        :type="get(toolbarOption, 'multipleRemove.type', 'danger')">
        {{ get(toolbarOption, 'multipleRemove.text', '批量删除') }}
      </el-button>
      <slot name="toolbar"></slot>
    </div>
    <div class="z-toolbar__right">

      <el-tooltip content="刷新" placement="bottom" effect="light">
        <el-button icon="el-icon-refresh-right" circle :size="circleButtionSize" @click="handleSearch"></el-button>
      </el-tooltip>


      <el-tooltip content="显示/隐藏查询" placement="bottom" effect="light">
        <el-button type="primary" icon="el-icon-search" circle :size="circleButtionSize"
          @click="handleShowSearch"></el-button>
      </el-tooltip>

      <el-tooltip content="列设置" placement="bottom" effect="light">
        <el-button type="primary" icon="el-icon-view" circle :size="circleButtionSize"
          @click="handleColumnSetting"></el-button>
      </el-tooltip>


    </div>


    <el-drawer title="列设置" :visible.sync="drawer" direction="ltr" size="180px">
      <el-checkbox-group v-for="(col, index) in $parent.$attrs.columns" :key="index" v-model="col.show"
        @change="columnChange">
        <el-checkbox :label="col.label"></el-checkbox>
      </el-checkbox-group>
    </el-drawer>
  </div>
</template>

<script>
import { MODE } from '../constants';
export default {
  name: 'z-toolbar',
  components: {},
  inject:['get'],
  props: {
    toolbarOption: {
      type: Object,
      default: () => { }
    },
  },
  inject: ['get', 'deleteConfirm'],
  data() {
    return {
      functionButtionSize: 'small',
      circleButtionSize: 'small',
      functionDefaultType: 'primary',
      drawer: false,
    };
  },

  created() {
  },
  mounted() {

  },
  computed: {

  },
  destroyed() { },

  methods: {
    handleSearch() {
      this.$parent.$emit('search')
    },
    handleShowSearch() {
      this.$parent.$refs.zSearch.showSearchFlag = !this.$parent.$refs.zSearch.showSearchFlag
      this.$parent.getTableHeight()
    },
    handleColumnSetting() {
      this.drawer = true
    },
    handleCteate() {
      this.$parent.currentMode = MODE.CREATE
      this.$parent.$emit('dialog-before-open', this.$parent.currentMode)
      this.$parent.resetFormItemOption()
      this.$parent.isShowDialog = true
    },
    handleMultipleRemove() {
      this.$parent.getSelection().then(selection => {
        this.deleteConfirm().then(res => {
          this.$parent.$emit('multiple-remove', selection)

        }, err => {
          console.log(err);
        })
      })

    },
    columnChange() {
      this.$parent.$refs.zTable.$refs.elTable.doLayout()
    }
  }
}

</script>
<style lang='scss' scoped>
@import '../z-curd.scss';

.z-toolbar {
  // border-top: 1px solid $border_color;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &_left {
    flex: 1;
  }

  &_right {}

  ::v-deep .el-drawer__body {
    padding: 20px;
  }

}
</style>
