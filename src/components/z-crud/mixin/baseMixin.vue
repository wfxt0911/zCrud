
<script>
import { handleAttribute, deepCopy } from '../utils/index'
export default {
  name: 'baseMixin',
  props: {
    size: {
      type: String,
      default: 'default'
    },

  },
  provide() {
    return {
      size: this.size,

    }
  },
  data() {
    return {
      tableOption: {
        height: undefined
      }
    };
  },
  created() {
  },
  mounted() {
    this.getTableHeight()

  },


  methods: {
    handleAttribute, deepCopy,
    getTableHeight() {
      if (this.$attrs.tableOption) {
        Object.assign(this.tableOption, this.$attrs.tableOption)
      }
      (!this.tableOption.height) && (this.tableOption.height = this.$refs.zTable.$el.offsetHeight)
    }
  }
}

</script>
