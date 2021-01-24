<template>
  <div class="umis-data__debug">
    <pre>{{ data }}</pre>
  </div>
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
  },
  mixins: [initData],
};
</script>
