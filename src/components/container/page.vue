<template>
  <div>
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body">
        <mis-component
          v-bind="getFattingProps(child)"
          :mis-name="child.renderer"
          :key="`${path}/${index}/${child.renderer}`"
          :path="`${path}/${index}/${child.renderer}`"
          :props="getFattingProps(child)"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          :init-data="getInitData(data, child)"
        />
      </template>
    </template>
    <mis-component
      v-else
      v-bind="getFattingProps(body)"
      :mis-name="body.renderer"
      :path="`${path}/${body.renderer}`"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </div>
</template>
<script>
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';
import derivedProp from '../mixin/derived-prop';

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
