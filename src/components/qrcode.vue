<template>
  <div
    class="umis-qrcode__container"
    :class="classname"
  >
    <div ref="qrcode" />
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';

export default {
  name: 'MisQrcode',
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 128
    },
    colorDark: {
      type: String,
      required: false,
      default: '#000'
    },
    colorLight: {
      type: String,
      required: false,
      default: '#fff'
    },
    classname: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new QRCode(this.$refs.qrcode, {
        width: this.size,
        height: this.size,
        text: this.value,
        colorDark: this.colorDark,
        colorLight: this.colorLight
      });
    }
  }
}
</script>
