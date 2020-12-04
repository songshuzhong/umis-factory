<template>
  <span v-if="inline" v-html="getHtml" />
  <div v-else v-html="getHtml" />
</template>
<script>
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';

export default {
  name: 'MisHtml',
  props: {
    html: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    getHtml() {
      return this.$getRenderedTpl(this.html, this.data);
    },
  },
  mixins: [initData, derivedProp],
};
</script>
