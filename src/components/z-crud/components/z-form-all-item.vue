<template>
  <div class='z-form-all-item'>
    <el-row :gutter="gutter">
      <template v-for="(item, key, index) in formData">
        <el-col :key="index" v-if="handleAttribute(item.component.show, true)"
          :span="handleAttribute(item.component.span, 24)" :offset="handleAttribute(item.component.offset, 0)">
          <el-form-item :label="item.label" :prop="item.field">
            <el-input
              v-if="(!item.component) || ((!item.component.name) && (!item.component.render)) || item.component.name === 'el-input'"
              v-model="item.value" :size="handleAttribute(item.component.size, size)"
              v-bind="handleAttribute(item.component, {})" @change="formItemChange(formData[key], key)">
            </el-input>
            <el-input-number v-else-if="item.component.name === 'el-input-number'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-input-number>
            <el-radio-group v-else-if="item.component.name === 'el-radio'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
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
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
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
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
              <el-option v-for="option in item.component.options" :key="option.value" v-bind="option">
              </el-option>
            </el-select>
            <el-cascader v-else-if="item.component.name === 'el-cascader'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-cascader>
            <el-switch v-else-if="item.component.name === 'el-switch'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-switch>
            <el-slider v-else-if="item.component.name === 'el-slider'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-slider>
            <el-time-select v-else-if="item.component.name === 'el-time-select'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-time-select>
            <el-time-picker v-else-if="item.component.name === 'el-time-picker'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-time-picker>
            <el-date-picker v-else-if="item.component.name === 'el-date-picker'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-date-picker>
            <el-rate v-else-if="item.component.name === 'el-rate'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-rate>
            <el-color-picker v-else-if="item.component.name === 'el-color-picker'" v-model="item.value"
              :size="handleAttribute(item.component.size, size)" v-bind="handleAttribute(item.component, {})"
              @change="formItemChange(formData[key], key)">
            </el-color-picker>
            <render-custom-component v-else-if="item.component.name" v-model="item.value"
              :component-name="item.component.name" :props="item.component.props ? item.component.props : null">
            </render-custom-component>
            <render-component v-else-if="item.component.render" :render-function="item.component.render"
              :scope="formData[key]">
            </render-component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import { handleAttribute } from '../utils/index'
import { MODE } from '../constants/index'
export default {
  name: 'z-form-all-item',
  components: {},
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
    handleAttribute,
    formItemChange(raw, field) {
      if (this.mode == MODE.SEARCH) {
         this.$parent?.$parent?.$parent?.$emit('search-item-change', raw, field)
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.z-form-all-item {
  .el-select{
    width: 100%;
  }
}
</style>
