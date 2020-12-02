<template>
  <el-footer :class="classname">
    <template v-for="(item, index) in body">
      <mis-component
        v-bind="item"
        :mis-name="item.renderer"
        :path="`${path}/${index}/${item.renderer}`"
        :key="`${path}/${index}/${item.renderer}`"
      />
    </template>
  </el-footer>
</template>

<script>
import { Footer as ElFooter } from 'element-ui';

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
};
</script>
