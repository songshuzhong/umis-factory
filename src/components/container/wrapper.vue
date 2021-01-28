<template>
  <div :class="`umis-wrapper__container index-${index} ${classname}`">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
        <mis-component
          :mis-name="child.renderer"
          :path="`${path}/${index}/${child.renderer}`"
          :index="index"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          :props="getFattingProps(child, data)"
          :init-data="getInitData(data, child)"
        />
      </template>
    </template>
    <mis-component
      v-if="Object.prototype.toString.call(body) === '[object Object]'"
      :mis-name="body.renderer"
      :path="`${path}/${body.renderer}`"
      :body="getBody(body)"
      :header="getHeader(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </div>
</template>
<script>
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisWrapper',
  props: {
    path: {
      type: String,
      required: true,
    },
    index: {
      type: String,
      required: false,
    },
    body: {
      type: [Object, Array],
      required: true,
    },
    classname: {
      type: String,
      required: false,
      default: ''
    },
  },
  mixins: [derivedProp, initData],
};
</script>
