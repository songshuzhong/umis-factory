<template>
  <div>
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body">
        <mis-component
          :mis-name="child.renderer"
          :key="`${path}/${index}/${child.renderer}`"
          :path="`${path}/${index}/${child.renderer}`"
          :props="getFattingProps(child)"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          v-bind="getFattingProps(child)"
          :init-data="getInitData(child)"
          :linkage-trigger="onLinkageTrigger"
        />
      </template>
    </template>
    <mis-component
      v-else
      :mis-name="body.renderer"
      :path="`${path}/${body.renderer}`"
      :body="getBody(body)"
      :header="getHeader(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(body)"
      v-bind="getFattingProps(body)"
    />
  </div>
</template>
<script>
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';
import derivedProp from '../mixin/derived-prop';
import linkage from '../mixin/linkage';

export default {
  name: 'MisPage',
  props: {
    body: {
      type: [Array, Object],
      required: false,
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  mixins: [initApi, initData, derivedProp],
};
</script>
