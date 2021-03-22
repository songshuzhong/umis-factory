<template>
  <mis-component
    v-if="body"
    :mis-name="body.renderer"
    :path="`${path}/${body.renderer}`"
    :body="getBody(body)"
    :header="getHeader(body)"
    :footer="getFooter(body)"
    :props="getFattingProps(body, data)"
    :init-data="data[value]"
    v-bind="getFattingProps(body, data)"
  />
  <span v-else-if="!body && inline" v-html="getMapItem" />
  <div v-else-if="!body && !inline" v-html="getMapItem" />
</template>

<script>
import { defineComponent, watch, ref, getCurrentInstance } from 'vue';
import initApi from './mixin/props/init-api';
import useInitApi from './mixin/useInitApi';
import useDerivedProp from './mixin/useDerivedProp';

export default defineComponent({
  name: 'MisMapping',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    map: {
      type: String,
      required: false,
    },
    body: {
      type: Object,
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
    const primaryKey = ref('');
    const getMapItem = () => {
      if (props.map) {
        const key = ctx.$getRenderedTpl(props.primaryKey, data);
        return props.map[key];
      }
      return '';
    };

    watch(value, val => {
      primaryKey.value = val;
    });

    return {
      getMapItem,
      ...useDerivedProp()
    };
  }
});
</script>
