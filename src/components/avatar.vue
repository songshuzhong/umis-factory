<template>
  <el-avatar
    v-bind="data"
    :classname="classname"
    :icon="icon"
    :shape="shape"
    :size="size"
    :fit="fit"
    :src="isComputedSrc ? computedSrc : src"
    :src-set="srcSet"
    :alt="alt"
    @click.native="onClick"
  />
</template>
<script>
import { Avatar as ElAvatar } from 'element-ui';
import initData from './mixin/init-data';

export default {
  name: 'MisAvatar',
  components: {
    ElAvatar,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: 'large',
      options: ['number', 'large', 'medium', 'small'],
    },
    shape: {
      type: String,
      required: false,
      default: 'circle',
      options: ['circle', 'square'],
    },
    src: {
      type: String,
      required: false,
    },
    srcSet: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
    fit: {
      type: String,
      required: false,
      default: 'cover',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    },
    isComputedSrc: {
      type: Boolean,
      required: false,
      default: false,
    },
    action: {
      type: Function,
      required: false,
    },
    actionType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      computedSrc: '',
    };
  },
  mixins: [initData],
  created() {
    this.computedSrc = this.$getCompiledUrl(this.src, this.data);
  },
  methods: {
    onClick() {
      this.action && this.action();
    },
  },
};
</script>
