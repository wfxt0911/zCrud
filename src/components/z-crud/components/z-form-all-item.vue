<template>
  <div class='z-form-all-item'>
    <el-row :gutter="gutter">
      <template v-for="(item, key, index) in formData">
        <el-col :key="index" v-if="handleItemShow(get(item, 'component.show', true))"
          :span="get(item, 'component.span', 24)" :offset="get(item, 'component.offset', 0)">
          <el-form-item :label="item.label" :prop="key">
            <el-input
              v-if="(!item.component) || ((!item.component.name) && (!item.component.render)) || item.component.name === 'el-input'"
              v-model="item.value" :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-input>
            <el-input-number v-else-if="item.component.name === 'el-input-number'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-input-number>
            <el-radio-group v-else-if="item.component.name === 'el-radio'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
              <template v-if="item.component.buttonMode">
                <el-radio-button v-for="option in item.component.options" :key="option.value" :label="option.value">
                  {{ option.label }}
                </el-radio-button>
              </template>
              <template v-else>
                <el-radio v-for="option in item.component.options" :key="option.value" :label="option.value">
                  {{ option.label }}
                </el-radio>
              </template>
            </el-radio-group>
            <el-checkbox-group v-else-if="item.component.name === 'el-checkbox'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
              <template v-if="item.component.buttonMode">
                <el-checkbox-button v-for="option in item.component.options" :key="option.value" :label="option.value">
                  {{ option.label }}
                </el-checkbox-button>
              </template>
              <template v-else>
                <el-checkbox v-for="option in item.component.options" :key="option.value" :label="option.value">
                  {{ option.label }}
                </el-checkbox>
              </template>
            </el-checkbox-group>
            <el-select v-else-if="item.component.name === 'el-select'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
              <el-option v-for="option in item.component.options" :key="option.value" v-bind="option">
              </el-option>
            </el-select>
            <el-cascader v-else-if="item.component.name === 'el-cascader'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-cascader>
            <el-switch v-else-if="item.component.name === 'el-switch'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-switch>
            <el-slider v-else-if="item.component.name === 'el-slider'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-slider>
            <el-time-select v-else-if="item.component.name === 'el-time-select'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-time-select>
            <el-time-picker v-else-if="item.component.name === 'el-time-picker'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-time-picker>
            <el-date-picker v-else-if="item.component.name === 'el-date-picker'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-date-picker>
            <el-rate v-else-if="item.component.name === 'el-rate'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-rate>
            <el-color-picker v-else-if="item.component.name === 'el-color-picker'" v-model="item.value"
              :size="get(item, 'component.size', size)" v-bind="get(item, 'component', {})"
              :disabled="handleItemDisabled(get(item, 'component.disabled', false))"
              @change="formItemChange(formData[key], key)" v-on="item.component.event">
            </el-color-picker>
            <z-render-custom-component v-else-if="item.component.name" v-model="item.value"
              :component-name="item.component.name" :props="item.component.props ? item.component.props : null"
              v-on="item.component.on"
              >
            </z-render-custom-component>
            <z-render-component v-else-if="item.component.render" :render-function="item.component.render"
              :scope="formData[key]">
            </z-render-component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import { MODE } from '../constants/index'
import zRenderCustomComponent from './z-render-custom-component.vue'
import zRenderComponent from './z-render-component.vue'

export default {
  name: 'z-form-all-item',
  components: { zRenderCustomComponent, zRenderComponent },
  inject: ['get', 'currentMode'],
  props: {
    formData: {
      type: Object,
      default: () => { }
    },
    mode: {
      type: String,
      required: true
    },
    gutter: {
      type: Number,
      default: 20
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
    };
  },


  mounted() { },

  destroyed() { },

  methods: {
    formItemChange(raw, field) {
      if (this.mode == MODE.SEARCH) {
        this.$parent?.$parent?.$parent?.$emit('search-item-change', { raw, field })
      } else {
        this.$parent?.$parent?.$parent?.$emit('form-item-change', { raw, field, mode: this.$parent.currentMode })
      }
    },
    handleItemShow(show) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        return show(this.currentMode())
      }
      return Boolean(show)
    },
    handleItemDisabled(show) {
      if (typeof show === 'boolean') {
        return show
      } else if (typeof show === 'function') {
        return show(this.currentMode())
      }
      return Boolean(show)

    }
  }
}

</script>
<style lang='scss' scoped>
.z-form-all-item {

  .el-select,
  .el-input-number,
  .el-date-editor {
    width: 100%;
  }
}
</style>
