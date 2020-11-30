<template>
  <div v-html="getMapItem"></div>
</template>

<script>
import initData from './mixin/initData';

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
  },
  data() {
    return {
      primaryKey: ''
    };
  },
  watch: {
    value: {
      handler(val) {
        this.primaryKey = val;
      },
      immediate: true
    },
  },
  mixins: [initData],
  computed: {
    getMapItem() {
      const key = this.$getRenderedTpl(this.primaryKey, this.data);
      return this.map[key];
    },
  },
};
</script>
