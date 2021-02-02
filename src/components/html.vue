<template>
  <span
    v-if="inline"
    v-html="getHtml"
    :class="classname"
  />
  <div
    v-else
    v-html="getHtml"
    :class="classname"
  />
</template>
<script>
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';

export default {
  name: 'MisHtml',
  props: {
    path: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    classname: {
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
