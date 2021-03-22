<template>
  <div class="umis-data__debug">
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisStatic',
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  mixins: [initApi],
  setup(props) {
    return {
      ...useInitApi(props)
    };
  }
});
</script>
