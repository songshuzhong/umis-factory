<template>
  <template v-for="(item, index) in rows || data" :key="`${path}/${index}/${body.renderer}`">
    <mis-component
      :mis-name="body.renderer"
      :path="`${path}/${index}/${body.renderer}`"
      :props="getFattingProps(body)"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      v-bind="getFattingProps(body)"
      :init-data="item"
    />
  </template>
</template>

<script>
import initData from './mixin/init-data';
import derivedProp from './mixin/derived-prop';

export default {
  name: 'MisEach',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    body: {
      type: Object,
      required: true,
    },
  },
  mixins: [initData, derivedProp],
};
</script>
