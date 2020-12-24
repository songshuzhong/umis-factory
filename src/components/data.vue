<template>
  <pre class="umis-data__debug">
    {{ data }}
  </pre>
</template>

<script>
import initData from './mixin/init-data';

export default {
  name: 'MisStatic',
  props: {
    path: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  mixins: [initData],
};
</script>
