<template>
  <fragment>
    <template v-for="(item, index) in data">
      <mis-component
        :mis-name="body.renderer"
        :key="`${path}/${index}/${body.renderer}`"
        :path="`${path}/${index}/${body.renderer}`"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        v-bind="getFattingProps(body)"
        :init-data="item"
      />
    </template>
  </fragment>
</template>

<script>
import initData from './mixin/init-data';
import derivedProp from './mixin/derived-prop';

export default {
  name: 'MisList',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: Object,
      required: true,
    },
  },
  mixins: [initData, derivedProp],
};
</script>
