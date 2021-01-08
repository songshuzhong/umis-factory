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
import { ElAvatar } from 'element-plus';
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
    color: {
      type: String,
      required: false,
    },
    bgColor: {
      type: String,
      required: false,
    },
    borderRadius: {
      type: Number,
      required: false,
    },
    invert: {
      type: Boolean,
      required: false,
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
      iconProps: {},
    };
  },
  computed: {
    renderTitle() {
      if (this.title) {
        return this.$getRenderedTpl(this.title, this.data);
      }
      return undefined;
    },
    renderSubTitle() {
      if (this.subTitle) {
        return this.$getRenderedTpl(this.subTitle, this.data);
      }
      return undefined;
    },
    renderDescription() {
      if (this.description) {
        return this.$getRenderedTpl(this.description, this.data);
      }
      return undefined;
    },
  },
  mixins: [initData],
  created() {
    if (this.src) {
      this.computedSrc = this.$getCompiledUrl(this.src, this.data);
    }
    this.iconProps = {
      size: this.size,
      color: this.color,
      bgColor: this.bgColor,
      icon: this.icon,
      invert: this.invert,
      borderRadius: this.borderRadius,
      action: this.action,
      actionType: this.actionType,
    };
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
