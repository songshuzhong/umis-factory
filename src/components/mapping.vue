<template>
  <mis-component
    v-if="body"
    :mis-name="body.renderer"
    :path="`${path}/${body.renderer}`"
    :body="getBody(body)"
    :header="getHeader(body)"
    :footer="getFooter(body)"
    :props="getFattingProps(body, data)"
    :init-data="data[value]"
    v-bind="getFattingProps(body, data)"
  />
  <div v-else v-html="getMapItem"></div>
</template>

<script>
import initData from './mixin/initData';
import derivedProp from './mixin/derivedProp';

export default {
  name: 'MisMapping',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: true,
    },
    body: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      primaryKey: '',
    };
  },
  watch: {
    value: {
      handler(val) {
        this.primaryKey = val;
      },
      immediate: true,
    },
  },
  mixins: [initData, derivedProp],
  computed: {
    getMapItem() {
      const key = this.$getRenderedTpl(this.primaryKey, this.data);
      return this.map[key];
    },
  },
};
</script>
