<template>
  <el-alert type="error" class="umis-component__not-find">
    <template slot="title">
      错误：{{ errorInfo.error }}<br />路径：{{ path }}
    </template>
    <pre>{{ errorInfo.props }}</pre>
  </el-alert>
</template>

<script>
import { Alert as ElAlert } from 'element-ui';
export default {
  name: 'MisError',
  components: {
    ElAlert,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    errorInfo: {
      type: Object,
      required: false,
    },
  },
};
</script>
