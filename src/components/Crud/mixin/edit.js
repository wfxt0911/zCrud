import _forEach from 'lodash.foreach'
import _clonedeep from 'lodash.clonedeep'

export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit (index, row, templage = null) {
      // 值得注意的是row的数据有可能是多余formData,因为row是后端返回的数据,而formData只是允许修改的部分数据也是有可能的
      this.formMode = 'edit'
      // 编辑暂存数据，用于储存不在editTemplate中的数据
      this.editDataStorage = _clonedeep(row)
      this.isDialogShow = true
      this.$emit('dialog-open', {
        mode: 'edit',
        row
      })
      this.editIndex = index
      if (templage) {
        this.formData = _clonedeep(templage)
        // 修改表单模板暂存,为什么要有这个变量呢?
        //因为这个editTemplateStorage变量存的是带有组件类型的数据,
        //而formData仅仅是一个表单数据;
        this.editTemplateStorage = _clonedeep(templage)
      } else {
        //editTemplate 修改表单模板
        this.formData = this.editTemplate ? _clonedeep(this.editTemplate) : {}
        this.editTemplateStorage = this.editTemplate ? _clonedeep(this.editTemplate) : {}
      }
      // 逐个属性进行赋值
      _forEach(this.formData, (value, key) => {
        this.formData[key] = row.hasOwnProperty(key) ? row[key] : (this.formData[key] || '')
      })
    }
  }
}
