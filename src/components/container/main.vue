<template>
  <el-main :class="classname">
    <router-view v-if="routerView" />
    <template v-else>
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(child, index) in body">
          <mis-component
            :mis-name="child.renderer"
            :key="`${path}/${index}/${child.renderer}`"
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
        :mis-name="body.renderer"
        :path="`${path}/${body.renderer}`"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :props="getFattingProps(body)"
        :init-data="getInitData(data, body)"
      />
    </template>
  </el-main>
</template>

<script>
import { Main as ElMain } from 'element-ui';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisMain',
  components: {
    ElMain,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: false,
    },
    routerView: {
      type: Boolean,
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
