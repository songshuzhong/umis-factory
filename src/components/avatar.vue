<template>
  <div v-if="title" class="umis-avatar__container">
    <div class="umis-avatar__logo">
      <el-avatar
        :class="classname"
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
    :class="classname"
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
import { defineComponent, computed, ref, reactive, onBeforeMount, getCurrentInstance } from 'vue';
import { ElAvatar } from 'element-plus';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
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
      options: ['number', 'large', 'medium', 'small'],
    },
    shape: {
      type: String,
      required: false,
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
      required: false,
    },
  },
  mixins: [initApi],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { data } = useInitApi(props);
    const computedSrc = ref();
    let iconProps = reactive({});
    const renderTitle = computed(() => {
      if (props.title) {
        return ctx.$getRenderedTpl(props.title, data);
      }
      return undefined;
    });
    const renderSubTitle = computed(() => {
      if (props.subTitle) {
        return ctx.$getRenderedTpl(props.subTitle, data);
      }
      return undefined;
    });
    const renderDescription = computed(() => {
      if (props.description) {
        return ctx.$getRenderedTpl(props.description, data);
      }
      return undefined;
    });

    const onClick = () => {
      const { renderer, content, url, redirect, blank } = ctx.attrs;
      if (props.action && typeof props.action === 'function') {
        props.action(
          { renderer, content, url, redirect, blank, actionType: props.actionType },
          data
        );
      }
    };
    onBeforeMount(() => {
      if (props.src) {
        computedSrc.value = ctx.$getCompiledUrl(props.src, data);
      }
      iconProps = {
        size: props.size,
        color: props.color,
        bgColor: props.bgColor,
        icon: props.icon,
        invert: props.invert,
        borderRadius: props.borderRadius,
        action: props.action,
        actionType: props.actionType,
      };
    });

    return {
      computedSrc,
      iconProps,
      renderTitle,
      renderSubTitle,
      renderDescription,
      onClick
    };
  }
});
</script>
