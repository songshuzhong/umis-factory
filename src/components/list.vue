<template>
  <fragment>
    <template v-for="(item, index) in iOptions" :key="index">
      <mis-component
        :mis-name="body.renderer"
        :path="`${path}/${index}/${body.renderer}`"
        :props="getFattingProps(body, item)"
        v-bind="getFattingProps(body, item)"
      />
    </template>
  </fragment>
</template>

<script>
import initData from './mixin/initData';
import initApi from './mixin/initApi';
import MisComponent from './container/component';
import derivedProp from './mixin/derivedProp';

export default {
  name: 'MisList',
  components: { MisComponent },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: false,
    },
    body: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      iOptions: [],
    };
  },
  watch: {
    options: {
      handler(val) {
        this.iOptions = val;
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [initData, initApi, derivedProp],
};
</script>
