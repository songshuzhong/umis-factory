<template>
  <el-container :direction="direction" :class="classname">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
        <mis-component
          v-bind="getFattingProps(child)"
          :mis-name="child.renderer"
          :path="`${path}/body/${index}/${child.renderer}`"
          :header="getHeader(child)"
          :body="getBody(child)"
          :footer="getFooter(child)"
          :props="getFattingProps(child, data)"
          :init-data="getInitData(data, child)"
          :visible-on="child.visibleOn"
        />
      </template>
    </template>
    <mis-component
      v-else-if="Object.prototype.toString.call(body) === '[object Object]'"
      v-bind="getFattingProps(body)"
      :mis-name="body.renderer"
      :path="`${path}/body/${body.renderer}`"
      :body="getBody(body)"
      :header="getHeader(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </el-container>
</template>

<script>
import { defineComponent } from 'vue';
import { ElContainer, ElHeader, ElMain, ElAside, ElFooter } from 'element-plus';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import linkage from '../mixin/linkage';
import mixinProps from '../mixin/props/layout';

export default defineComponent({
  name: 'MisLayout',
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElFooter,
  },
  mixins: [mixinProps, derivedProp, initData, linkage],
});
</script>
