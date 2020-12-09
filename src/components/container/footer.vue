<template>
  <el-footer :class="classname">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body">
        <mis-component
          :mis-name="child.renderer"
          :path="`${path}/${index}/${child.renderer}`"
          :key="`${path}/${index}/${child.renderer}`"
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
      :key="`${path}/${body.renderer}`"
      :path="`${path}/${body.renderer}`"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </el-footer>
</template>

<script>
import { ElFooter } from 'element-plus';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisMain',
  components: {
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
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [derivedProp, initData],
};
</script>
