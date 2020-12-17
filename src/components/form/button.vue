<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :nativeType="nativeType"
    @click="onClick"
  >
    {{ text }}
  </el-button>
</template>
<script>
import { Button as ElButton } from 'element-ui';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';

export default {
  name: 'MisButton',
  components: {
    ElButton,
  },
  props: {
    action: {
      type: Function,
      required: false,
    },
    afterAction: {
      type: Function,
      required: false,
    },
    index: {
      type: String,
      required: false,
    },
    body: {
      type: Object,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    plain: {
      type: Boolean,
      required: false,
    },
    round: {
      type: Boolean,
      required: false,
    },
    circle: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    nativeType: {
      type: String,
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
  },
  mixins: [initData, visible],
  methods: {
    onClick() {
      if (typeof this.index === 'number') {
        this.action(this.index);
      } else {
        this.action();
      }
    },
  },
};
</script>
