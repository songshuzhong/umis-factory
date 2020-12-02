<template>
  <transition :name="transition">
    <el-alert v-if="showErrorBoundary" title="错误: 渲染失败了" type="error">
      <pre class="umis-component__not-find">
          <code>
{{`{
    "name": "${misName}"
    "path": "${path}"
    "error": "${error}"
}`}}
          </code>
        </pre>
    </el-alert>
    <component
      v-if="iVisible && forceRerender"
      v-show="iHidden && forceRerender"
      v-bind="getSlimmingProps(props)"
      :is="misName"
      :path="path"
      :header="header"
      :body="body"
      :footer="footer"
      :action="action"
      :linkage-trigger="onLinkageTrigger"
      :init-data="getDataProps(props, data)"
    />
  </transition>
</template>

<script>
import copy from 'copy-to-clipboard';
import { Alert as ElAlert } from 'element-ui';
import derivedProp from '../mixin/derivedProp';
import linkage from '../mixin/linkage';
import visible from '../mixin/visible';
import initData from '../mixin/initData';
import initApi from '../mixin/initApi';

export default {
  name: 'mis-Component',
  components: {
    ElAlert,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    misName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    props: {
      type: Object,
      required: false,
    },
    header: {
      type: [Array, Object],
      required: false,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
  },
  mixins: [visible, initApi, initData, linkage, derivedProp],
  data() {
    return {
      error: '',
      clipboard: '',
      forceRerender: true,
    };
  },
  errorCaptured(err, vm, info) {
    this.error = `'${err.message}' is found in ${info} of component`;

    return false;
  },
  computed: {
    showErrorBoundary() {
      if (!this.$misComponents.includes(this.misName)) {
        this.error = '找不到对应的渲染器';
        return true;
      } else if (this.error) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.$eventHub.$on('mis-component:reload', this.handleReload);
  },
  methods: {
    action(feedback) {
      switch (this.props.actionType) {
        case 'mis-ajax':
          this.handleAjaxAction(feedback);
          break;
        case 'mis-redirect':
          this.handleRedirectAction();
          break;
        case 'mis-url':
          this.handleUrlAction();
          break;
        case 'mis-copy':
          this.handleCopyAction();
          break;
      }
    },
    afterAction() {
      const { reload } = this.props;
      if (reload) {
        this.$eventHub.$emit('mis-component:reload', reload);
      }
    },
    handleReload(target) {
      if (this.props && target === this.props.name) {
        this.forceRerender = false;
        this.$nextTick(() => (this.forceRerender = true));
      }
    },
    handleAjaxAction(feedback) {
      this.handleFetchApi(this.props.actionApi)
        .then(() => {
          this.afterAction();
        })
        .finally(() => {
          feedback();
        });
    },
    handleUrlAction() {
      const url = this.$getCompiledUrl(this.props.url, this.data);
      this.props.blank ? window.open(url) : (window.location.href = url);
    },
    handleRedirectAction() {
      const url = this.$getCompiledUrl(this.props.url, this.data);
      if (/^https?:\/\//.test(url)) {
        window.location.replace(url);
      } else {
        this.$router.push(url);
      }
    },
    handleCopyAction() {
      const content = this.$getCompiledUrl(this.props.content, this.data);
      copy(content);
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success',
      });
    },
  },
};
</script>
<style lang="scss">
.el-alert__content {
  width: 100%;
}
.umis-component__not-find {
  width: 100%;
  background-color: white;
  font-size: 14px;
  text-align: left;
  color: #606266;
}
</style>
