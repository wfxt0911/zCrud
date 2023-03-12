<template>
  <div class='z-dialog'>
    <el-dialog :title="title" :visible="isShowDialog" :before-close="beforeClose" v-bind="dialogOption">
      <el-form ref="form" :model="formData" :rules="get(formOption, 'rules', {})" v-bind="formOption"
        :labelWidth="get(formOption, 'labelWidth', '80px')">

        <z-form-all-item :mode="currentMode()" :formData="formItemOption" :gutter="get(formOption, 'gutter', 20)"
          :size="get(formOption, 'size', formDefaultSize)"></z-form-all-item>
      </el-form>
      <template #footer>
        <div class="z-dialog__footer">
          <slot name="beforeSave"></slot>
          <el-button v-if="get(dialogOption, 'save.show', true)" :disabled="get(dialogOption, 'save.disabled', false)"
            v-bind="get(dialogOption, 'create', {})" @click="handleSave"
            :size="get(dialogOption, 'save.size', footerButtionSize)"
            :type="get(dialogOption, 'save.type', footerButtonType)">
            {{ get(dialogOption, 'save.text', '保存') }}
          </el-button>
          <slot name="afterSave"></slot>

          <el-button v-if="get(dialogOption, 'cancle.show', true)" :disabled="get(dialogOption, 'cancle.disabled', false)"
            v-bind="get(dialogOption, 'cancle', {})" @click="closeDialog"
            :size="get(dialogOption, 'cancle.size', footerButtionSize)" :type="get(dialogOption, 'cancle.type', '')">
            {{ get(dialogOption, 'cancle.text', '取消') }}
          </el-button>

        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { MODE } from '../constants/index'
import zFormAllItem from './z-form-all-item.vue'
export default {
  name: 'z-dialog',
  components: { zFormAllItem },
  inject: ['get', 'currentMode'],
  props: {
    dialogOption: {
      type: Object,
      default: () => { }
    },
    formOption: {
      type: Object,
      default: () => { }
    },
    formItemOption: {
      type: Object,
      default: () => { }
    },
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formDefaultSize: 'medium',
      footerButtionSize: 'mini',
      footerButtonType: 'primary'
    };
  },
  computed: {
    title() {
      return this.currentMode() === MODE.EDIT ? this.get(this.dialogOption, 'editTitle', '编辑') : this.get(this.dialogOption, 'createTitle', '新增')
    },
    formData() {
      const _obj = {}
       Object.keys(this.formItemOption).forEach(key => {
        Reflect.set(_obj,key, this.formItemOption[key].value)
      })
      return _obj
    }
  },

  mounted() { },

  destroyed() { },

  methods: {
    closeDialog() {
      this.$emit('update:isShowDialog', false)
    },
    beforeClose() {
      this.closeDialog()
    },
    handleFormRulesMode() { },
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$parent.getFormItemData()
        } else {

        }
      })

    }
  }
}

</script>
<style lang='scss' scoped>
.z-dialog {}
</style>
