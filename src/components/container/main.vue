<template>
  <el-main :class="classname">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(item, index) in body">
        <mis-component
          :mis-name="item.renderer"
          :key="`${path}/${index}/${item.renderer}`"
          :path="`${path}/${index}/${item.renderer}`"
          :header="getHeader(item)"
          :body="getBody(item)"
          :footer="getFooter(item)"
          :props="getFattingProps(item, data)"
          v-bind="getFattingProps(item, data)"
        />
      </template>
    </template>
    <mis-component
      v-else
      :mis-name="body.renderer"
      :path="`${path}${body.renderer}`"
      :header="body.header"
      :body="body.body"
      :footer="body.footer"
      :props="body"
      v-bind="getFattingProps(body)"
    />
    <template v-if="routerView">
      <router-view />
    </template>
  </el-main>
</template>

<script>
import { Main as ElMain } from 'element-ui';

import derivedProp from '../mixin/derived-prop';

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
  mixins: [derivedProp],
};
</script>
