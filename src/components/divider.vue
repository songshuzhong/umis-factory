<template>
  <el-divider :direction="direction" :content-position="contentPosition">
    <i v-if="icon" :class="icon" />
    <template v-else>
      {{ renderTitle }}
    </template>
  </el-divider>
</template>

<script>
import {Divider as ElDivider} from 'element-ui';
import initData from './mixin/initData';

export default {
  name: 'MisDivider',
  components: {
    ElDivider,
  },
  props: {
    path: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
    contentPosition: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  computed: {
    renderTitle() {
      return this.$getRenderedTpl(this.text, this.data);
    },
  },
  mixins: [initData]
};
</script>
