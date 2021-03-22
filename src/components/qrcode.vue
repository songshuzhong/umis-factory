<template>
  <div
    class="umis-qrcode__container"
    :class="classname"
  >
    <div ref="qrcode" />
  </div>
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue';
import QRCode from 'qrcodejs2';

export default defineComponent({
  name: 'MisQrcode',
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 150
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
  setup(props) {
    const { ctx } = getCurrentInstance();
    const init = () => {
      new QRCode(ctx.$.$refs.qrcode, {
        width: props.size,
        height: props.size,
        text: props.value,
        colorDark: props.colorDark,
        colorLight: props.colorLight
      });
    };

    onMounted(() => {
      init()
    });
  }
})
</script>
