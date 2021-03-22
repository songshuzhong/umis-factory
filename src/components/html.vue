<template>
  <span
    v-if="inline"
    v-html="getHtml"
    :class="classname"
  />
  <div
    v-else
    v-html="getHtml"
    :class="classname"
  />
</template>
<script>
import { defineComponent, computed, getCurrentInstance } from 'vue';
import useDerivedProp from './mixin/useDerivedProp';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisHtml',
  props: {
    path: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mixins: [initApi],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { data } = useInitApi(props);
    const getHtml = computed(() => {
      return ctx.$getRenderedTpl(props.html, data);
    });

    return {
      getHtml,
      ...useDerivedProp()
    };
  }
});
</script>
