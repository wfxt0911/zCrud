<template>
  <div class='z-table'>
    <el-table ref="elTable" :data="data" v-bind="tableOption" @current-change="handleCurrentChange" @select="handleSelect"
      @select-all="handleSelectAll" @selection-change="handleSelectionChange" @sort-change="handleSortChange"
      @cell-mouse-enter="handleCellMouseEnter" @cell-mouse-leave="handleCellMouseLeave" @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick" @row-click="handleRowClick" @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick" @header-click="handleHeaderClick" @header-contextmenu="handleHeaderContextmenu"
      header-row-class-name="z-table-header"
       :size="handleAttribute(tableOption.size, tableDefaultSize)"
      >

      <!-- 多选列 -->
      <el-table-column v-if="selectionOption" type="selection" v-bind="selectionOption"
        :align="handleAttribute(selectionOption.align, tableColumnAlign)">
      </el-table-column>
      <!-- 序号列 -->
      <el-table-column v-if="indexOption" type="index" :label="handleAttribute(indexOption.title, '')"
        v-bind="indexOption" :align="handleAttribute(indexOption.align, tableColumnAlign)">
      </el-table-column>
      <!-- 业务列 -->
      <el-table-column v-for="(item, index) in columns" :key="index" :label="handleAttribute(item.label, '')"
        :prop="handleAttribute(item.field, null)" v-bind="item" :align="handleAttribute(item.align, tableColumnAlign)">
        <template v-slot="scope">
          <slot :name="item.field" :row="scope.row">{{ scope.row[item.field] }}</slot>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column v-if="handleOption" :label="handleAttribute(handleOption.columnHeader, '操作')" v-bind="handleOption"
        :align="tableColumnAlign">
        <template slot-scope="scope">
          <el-button v-if="handleOption.edit && handleOptionButtonShow(handleOption.edit.show, scope.$index, scope.row)"
            :disabled="handleOptionButtonDisabled(handleOption.edit.disabled, scope.$index, scope.row)"
            v-bind="handleOption.edit" @click="handleEdit(scope.row, scope.$index)"
            :size="handleAttribute(handleOption.edit.size, handleDefaultSize)"
            :type="handleAttribute(handleOption.edit.type, handleDefaultType)">
            {{ handleAttribute(handleOption.edit.text, '编辑') }}
          </el-button>
          <el-button
            v-if="handleOption.remove && handleOptionButtonShow(handleOption.remove.show, scope.$index, scope.row)"
            :type="handleAttribute(handleOption.remove.type, 'danger')"
            :disabled="handleOptionButtonDisabled(handleOption.remove.disabled, scope.$index, scope.row)"
            v-bind="handleOption.remove" @click="handleRemove(scope.row, scope.$index)"
            :size="handleAttribute(handleOption.remove.size, handleDefaultSize)">
            {{ handleAttribute(handleOption.remove.text, '删除') }}
          </el-button>
          <template v-for="(item, index) in handleAttribute(handleOption.custom, [])">
            <el-button :key="index" v-if="handleOptionButtonShow(item.show, scope.$index, scope.row)"
              :disabled="handleOptionButtonDisabled(item.disabled, scope.$index, scope.row)" v-bind="item"
              :size="handleAttribute(handleOption.edit.size, handleDefaultSize)"
              :type="handleAttribute(handleOption.edit.type, handleDefaultType)"
              @click="$parent.$emit(item.emit, { row: scope.row, index: scope.$index, })">
              {{ item.text }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'z-table',
  components: {},
  inject: ['handleAttribute'],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tableOption: {
      type: Object,
      default: () => { }
    },
    indexOption: {
      type: Object,
      default: () => { }
    },
    selectionOption: {
      type: Object,
      default: () => { }
    },
    columns: {
      type: Array,
      required: true
    },
    handleOption: {
      type: Object,
      default: () => { }
    },

  },
  data() {
    return {
      handleDefaultSize: 'small',
      handleDefaultType: 'primary',
      tableColumnAlign: 'center',
      tableDefaultSize: 'small',

    };
  },


  mounted() { },

  destroyed() { },

  methods: {
    //#region ==}========>el-table 事件传递
    /**
 * @description 行选中状态
 */
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    /**
     * @description 勾选数据时触发的事件
     */
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    /**
     * @description 勾选全选时触发的事件
     */
    handleSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    /**
     * @description 复选框选择项发生变化时触发的事件
     */
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    /**
     * @description 单元格 hover 进入时触发的事件
     */
    handleCellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    /**
     * @description 单元格 hover 退出时触发的事件
     */
    handleCellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    /**
     * @description 单元格点击时触发的事件
     */
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    /**
     * @description 单元格双击时触发的事件
     */
    handleCellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    /**
     * @description 行点击时触发的事件
     */
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    /**
     * @description 行右键点击时触发的事件
     */
    handleRowContextmenu(row, event) {
      this.$emit('row-contextmenu', row, event)
    },
    /**
     * @description 行双击时触发的事件
     */
    handleRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    /**
     * @description 表头点击时触发的事件
     */
    handleHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    },
    /**
     * @description 表头右键点击时触发的事件
     */
    handleHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    /**
     * @description 排序状态
    */
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    //#endregion
    //#region ==}========>操作列
    /**
    * @description 控制操作列 show 的方法
    */
    handleOptionButtonShow(show = true, index, row) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        return show(index, row)
      }
      return Boolean(show)
    },
    /**
     * @description 控制操作列 disabled 的方法
     */
    handleOptionButtonDisabled(disabled = false, index, row) {
      if (typeof disabled === 'boolean') {
        return disabled
      } else if (typeof disabled === 'function') {
        return disabled(index, row)
      }
      return Boolean(disabled)
    },


    handleEdit(index, row) {
      // this.$parent?.$emit('edit', row, index)
    },
    //#endregion

  }
}

</script>
<style lang='scss' scoped>
@import '../z-curd.scss';

.z-table {
  ::v-deep .z-table-header>th {
    background-color: $bg_color ;
  }

}
</style>
