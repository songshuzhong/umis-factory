<template>
  <el-affix
    :target="target"
    :offset="offset"
    :position="position"
    :z-index="zIndex"
  >
    <mis-component
      :mis-name="body.renderer"
      :path="`${path}/${body.renderer}`"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </el-affix>
</template>
<script>
import { ElAffix } from 'element-plus';
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';

export default {
  name: 'MisAffix',
  components: {
    ElAffix
  },
  props: {
    path: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: false
    },
    offset: {
      type: String,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    zIndex: {
      type: [Number, String],
      required: false
    },
    body: {
      type: Object,
      required: true
    }
  },
  mixins: [derivedProp, initData],
}
</script>
