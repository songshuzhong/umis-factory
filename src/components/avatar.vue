<template>
  <div v-if="title" class="umis-avatar__wrapper">
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
      this.action && this.action();
    },
  },
};
</script>
<style lang="scss">
.umis-avatar__wrapper {
  display: flex;
  .umis-avatar__logo {
    margin-right: 15px;
  }
  .umis-avatar__content {
    overflow: hidden;
  }
  .umis-avatar__title {
    margin-right: 30px;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 16px;
    color: #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .umis-avatar__subtitle {
    text-align: left;
    color: #909399;
    font-weight: 400;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .umis-avatar__description {
    font-size: 13px;
    color: #303133;
    line-height: 1.5;
  }
}
</style>
