<template>
  <el-container :direction="direction" :class="classname">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body">
        <mis-component
          :mis-name="child.renderer"
          :key="`${path}/${index}/${child.renderer}`"
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
import { Container as ElContainer } from 'element-ui';
import { Header as ElHeader } from 'element-ui';
import { Aside as ElAside } from 'element-ui';
import { Main as ElMain } from 'element-ui';
import { Footer as ElFooter } from 'element-ui';

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
    data: {
      type: Object,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [derivedProp, initData],
};
</script>
