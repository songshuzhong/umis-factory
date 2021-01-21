<template>
  <el-container :direction="direction" :class="classname">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
        <mis-component
          :mis-name="child.renderer"
          :path="`${path}/${index}/${child.renderer}`"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          :props="getFattingProps(child, data)"
          :init-data="getInitData(data, child)"
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
      :init-data="getInitData(data, body)"
    />
  </el-container>
</template>

<script>
import { ElContainer, ElHeader, ElMain, ElAside, ElFooter } from 'element-plus';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisLayout',
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElFooter,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [derivedProp, initData],
};
</script>
