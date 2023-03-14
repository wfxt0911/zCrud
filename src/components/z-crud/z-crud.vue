<template>
  <div class='z-crud' :style="style">
    <zSearch ref="zSearch" v-bind="get($attrs, 'searchOption', null)"></zSearch>
    <zToolbar :toolbarOption="$attrs.toolbarOption">
      <template #toolbar>
        <slot name="toolbar"></slot>
      </template>
    </zToolbar>
    <zTable ref="zTable" :data="$attrs.data" :selectionOption="$attrs.selectionOption" :indexOption="$attrs.indexOption"
      :columns="$attrs.columns" :handleOption="$attrs.handleOption" :tableOption="tableOption" :loading="loading">
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </zTable>
    <zPaper :paginationOption="$attrs.paginationOption"></zPaper>
    <zDialog ref="zDialog" :isShowDialog.sync="isShowDialog" :dialogOption="$attrs.dialogOption"
      :formOption="$attrs.formOption" :formItemOption="storageFormItemOption"></zDialog>
  </div>
</template>

<script>
import zPaper from './components/z-paper.vue'
import zSearch from './components/z-search.vue'
import zTable from './components/z-table.vue'
import zDialog from './components/z-dialog.vue'
import zToolbar from './components/z-toolbar.vue'


// 混入
import baseMixin from './mixin/baseMixin.vue'




export default {
  name: 'z-crud',
  components: { zPaper, zSearch, zTable, zDialog, zToolbar },
  mixins: [baseMixin],

  data() {
    return {
    };
  },


  mounted() {
  },

  destroyed() { },

  methods: {
  }
}

</script>
<style lang='scss' scoped>
.z-crud {
  display: flex;
  flex-direction: column;
  height: 100%;

  .z-table {
    flex: 1;
    overflow-y: hidden;
  }
}
</style>
