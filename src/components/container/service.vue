<template>
  <div
    v-loading="iApiLoading"
    class="umis-service__body"
  >
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
        <mis-component
          :mis-name="child.renderer"
          :path="`${path}/${index}/${child.renderer}`"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          :props="getFattingProps(child)"
          :init-data="getInitData(data, child)"
        />
      </template>
    </template>
    <mis-component
      v-else
      :path="`${path}/${body.renderer}`"
      :mis-name="body.renderer"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body, data, { rows })"
      :init-data="getInitData(data, body)"
    />
  </div>
</template>

<script>
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import initApi from '../mixin/init-api';

export default {
  name: 'MisService',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    header: {
      type: [Array, Object],
      required: false,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
  },
  mixins: [initData, initApi, derivedProp],
};
</script>
