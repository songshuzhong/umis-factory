<template>
  <transition :name="transition">
    <el-alert v-if="showErrorBoundary" title="错误: 渲染失败了" type="error">
      <pre class="umis-component__not-find">{{
        `{
    "name": "${misName}"
    "path": "${path}"
    "error": "${error}"
}`
      }}</pre>
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
      :init-data="data"
      :action="filterAction"
      :linkage-trigger="onLinkageTrigger"
    />
  </transition>
</template>

<script>
import copy from 'copy-to-clipboard';
import { Alert as ElAlert } from 'element-ui';

import derivedProp from '../mixin/derived-prop';
import linkage from '../mixin/linkage';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';

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
    action: {
      type: Function,
      required: false,
    },
  },
  mixins: [visible, initData, linkage, derivedProp],
  data() {
    return {
      error: '',
      clipboard: '',
      forceRerender: true,
    };
  },
  errorCaptured(err, vm, info) {
    this.error = `'${err.message}' is found in ${info} of component`;
    console.error(err);
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
    filterAction(props, feedback) {
      if (this.props.renderer === 'mis-action' && this.props.actions) {
        if (['mis-submit', 'mis-reset'].includes(props.actionType)) {
          return this.action();
        }
        return this.dispatchAction(props, feedback);
      } else if (
        ['mis-submit', 'mis-reset', 'mis-next', 'mis-previous'].includes(
          this.props.actionType
        )
      ) {
        return this.action();
      } else {
        return this.dispatchAction(this.props, feedback);
      }
    },
    dispatchAction(props, feedback) {
      switch (props.actionType) {
        case 'mis-ajax':
          this.handleAjaxAction(props, feedback);
          break;
        case 'mis-redirect':
          this.handleRedirectAction(props);
          break;
        case 'mis-url':
          this.handleUrlAction(props);
          break;
        case 'mis-copy':
          this.handleCopyAction(props);
          break;
      }
    },
    afterAction(props) {
      const { reload } = props;
      if (reload) {
        this.$eventHub.$emit('mis-component:reload', reload);
      }
    },
    handleReload(target) {
      if (target === 'window') {
        window.location.reload();
      } else if (this.props && target === this.props.name) {
        this.forceRerender = false;
        this.$nextTick(() => (this.forceRerender = true));
      }
    },
    handleAjaxAction(props, feedback) {
      this.$children[0].handleFetchApi(props.actionApi, feedback).then(() => {
        this.afterAction(props);
      });
    },
    handleUrlAction(props) {
      const url = this.$getCompiledUrl(props.url, this.data);
      props.blank ? window.open(url) : (window.location.href = url);
    },
    handleRedirectAction(props) {
      const url = this.$getCompiledUrl(props.redirect, this.data);
      if (/^https?:\/\//.test(url)) {
        window.location.replace(url);
      } else {
        this.$router.push(url);
      }
    },
    handleCopyAction(props) {
      const content = this.$getCompiledUrl(props.content, this.data);
      copy(content);
      this.$message({
        showClose: true,
        message: `已复制：${content}.`,
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
  overflow-x: scroll;
}
</style>
