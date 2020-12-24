<template>
  <div v-if="title" class="umis-avatar__container">
    <div class="umis-avatar__logo">
      <el-avatar
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
    </div>
    <div class="umis-avatar__content">
      <div v-if="title" class="umis-avatar__title" :title="renderTitle">
        {{ renderTitle }}
      </div>
      <div
        v-if="subTitle"
        class="umis-avatar__subtitle"
        :title="renderSubTitle"
      >
        {{ renderSubTitle }}
      </div>
      <div v-if="description" class="umis-avatar__description">
        {{ renderDescription }}
      </div>
    </div>
  </div>
  <el-avatar
    v-else
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
    path: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    subTitle: {
      type: String,
      required: false,
    },
    description: {
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
  computed: {
    renderTitle() {
      return this.$getRenderedTpl(this.title, this.data);
    },
    renderSubTitle() {
      return this.$getRenderedTpl(this.subTitle, this.data);
    },
    renderDescription() {
      return this.$getRenderedTpl(this.description, this.data);
    },
  },
  mixins: [initData],
  created() {
    this.computedSrc = this.$getCompiledUrl(this.src, this.data);
  },
  methods: {
    onClick() {
      const { renderer, content } = this.$attrs;
      if (this.action && typeof this.action === 'function') {
        this.action(
          { renderer, content, actionType: this.actionType },
          this.data
        );
      }
    },
  },
};
</script>
