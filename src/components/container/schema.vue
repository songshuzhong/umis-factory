<template>
  <div v-loading="iApiLoading || iSchemaLoading">
    <template
      v-if="Object.prototype.toString.call(iSchema) === '[object Array]'"
    >
      <component
        v-for="(item, index) in iSchema"
        v-bind="item"
        :key="index"
        :is="item.renderer"
        :path="`${path}/${index}/${item.renderer}`"
      />
    </template>
    <template
      v-if="Object.prototype.toString.call(iSchema) === '[object Object]'"
    >
      <component
        v-bind="iSchema"
        :is="iSchema.renderer"
        :key="iSchema.name"
        :path="`${path}/${iSchema.renderer}`"
      />
    </template>
  </div>
</template>
<script>
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';

export default {
  name: 'MisSchema',
  props: {
    schema: {
      type: [Array, Object],
      required: false,
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  mixins: [initApi, initData],
  watch: {
    schema: {
      handler(val) {
        this.iSchema = val;
      },
      immediate: true,
    },
  },
};
</script>
