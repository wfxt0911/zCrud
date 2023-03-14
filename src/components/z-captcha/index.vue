<template>
  <div class="z-captcha">
    <el-input :placeholder="placeholder" :size="size" :value="value" @input="input">
      <el-button :disabled="isDisabled" @click="getIdentifyCodeBtn"  slot="append">
        {{ isDisabled ? (count + 's后获取') : click }}</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "z-captcha",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: String,
    size: String,
    placeholder: {
      type: String,
      default: "请输入验证码",
    },
  },
  data() {
    return {
      count: "59",
      click: "获取验证码",
      isDisabled: false,
      globalPhoneReg: /red/,
      timer: null,
    };
  },

  mounted() { },

  destroyed() { },

  methods: {
    input(e) {
      this.$emit('input', e)
    },
    getIdentifyCodeBtn() {
      this.countTime()
      this.$emit('getCaptcha')
    },
    countTime() {
      const TIME_COUNT = 60; //倒计时60秒
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.isDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.z-captcha {
  .el-input {
    ::v-deep .el-input__suffix {
      right: 0;

      .el-button {
        width: 80px;
        padding: 12px 0;
        font-size: 12px;
      }
    }
  }
}
</style>
