<template>
  <el-container :direction="direction" :class="classname">
    <template v-for="(item, index) in body">
      <mis-component
        :mis-name="item.renderer"
        :key="index"
        :path="`${path}/${index}/${item.renderer}`"
        :header="getHeader(item)"
        :body="getBody(item)"
        :footer="getFooter(item)"
        :props="getFattingProps(item, data)"
        v-bind="getFattingProps(item, data)"
      />
    </template>
  </el-container>
</template>

<script>
import {Container as ElContainer} from 'element-ui';
import {Header as ElHeader} from 'element-ui';
import {Aside as ElAside} from 'element-ui';
import {Main as ElMain} from 'element-ui';
import {Footer as ElFooter} from 'element-ui';

import derivedProp from '../mixin/derivedProp';

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
  mixins: [derivedProp],
};
</script>
