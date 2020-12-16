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
<style lang="scss">
.umis-component__not-find {
  .el-alert__title {
    display: block;
    text-align: left;
  }
  .el-alert__content {
    width: 100%;
  }
  .el-alert__description {
    width: 100%;
    background-color: white;
    font-size: 14px;
    text-align: left;
    color: #606266;
    overflow-x: scroll;
  }
}
</style>
