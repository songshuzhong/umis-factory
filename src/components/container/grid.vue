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
        v-bind="getFattingProps(child)"
        :mis-name="child.renderer"
        :key="index"
        :path="`${path}/body/${index}/${child.renderer}`"
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
import { ElRow, ElCol } from 'element-plus';

import derivedProp from '../mixin/derived-prop';
import mixinProps from '../mixin/props/grid';

export default {
  name: 'MisGrid',
  components: {
    ElRow,
    ElCol,
  },
  mixins: [mixinProps, derivedProp],
};
</script>
