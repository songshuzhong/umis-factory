<template>
  <el-row
    :gutter="gutter"
    :type="type"
    :justify="justify"
    :align="align"
    :tag="tag"
  >
    <el-col
      v-for="(child, index) in body"
      :key="`${path}/${index}/${child.renderer}`"
      :class="classname"
      :span="child.span"
    >
      <mis-component
        :mis-name="child.renderer"
        :key="index"
        :path="`${path}/${index}/${child.renderer}`"
        :label="child.label"
        :header="getHeader(child)"
        :body="getBody(child)"
        :footer="getFooter(child)"
        :props="getFattingProps(child)"
        :init-data="getInitData(data, child)"
      />
    </el-col>
  </el-row>
</template>
<script>
import { Row as ElRow, Col as ElCol } from 'element-ui';

import derivedProp from '../mixin/derived-prop';

export default {
  name: 'MisGrid',
  components: {
    ElRow,
    ElCol,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
    gutter: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      required: false,
    },
    justify: {
      type: String,
      required: false,
      options: ['start', 'end', 'center', 'space-around', 'space-between'],
      default: 'start',
    },
    align: {
      type: String,
      required: false,
      options: ['top', 'middle', 'bottom'],
      default: 'top',
    },
    tag: {
      type: String,
      required: false,
      default: 'div',
    },
  },
  mixins: [derivedProp],
};
</script>
