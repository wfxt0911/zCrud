<script>
// import zCaptcha from '@/components/z-captcha'
export default {
  name: 'z-render-custom-component',
  components: {},
  props: {
    /**
     * @description v-model双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 传入的组件名
     */
    componentName: {
      required: true
    },
    /**
     * @description 传入的自定义参数
     */
    props: {
      default: null
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    }
  },
  render(h) {
    let self = this
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
      on: self.$listeners
    })
  }
}
</script>
