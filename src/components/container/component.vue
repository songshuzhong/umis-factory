<template>
  <transition :name="transition">
    <component
      v-if="iVisible && forceRerender"
      v-show="iHidden && forceRerender"
      v-bind="getSlimmingProps(props)"
      :is="componentName"
      :path="path"
      :header="header"
      :body="body"
      :footer="footer"
      :init-data="data"
      :error-info="errorInfo"
      :action="filterAction"
      :linkage-trigger="onLinkageTrigger"
    />
  </transition>
</template>

<script>
import copy from 'copy-to-clipboard';
import { Dialog as ElDialog } from 'element-ui';
import derivedProp from '../mixin/derived-prop';
import linkage from '../mixin/linkage';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';

export default {
  name: 'MisComponent',
  components: {
    ElDialog,
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
    actions: {
      type: Array,
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
  computed: {
    errorInfo() {
      if (this.error) {
        return {
          props: this.props,
          error: this.error,
        };
      }
      return {};
    },
    componentName() {
      return this.error ? 'mis-error' : this.misName;
    },
  },
  errorCaptured(err, vm, info) {
    this.error = `'${err.message}' is found in ${info} of ${this.misName} component`;
    return false;
  },
  created() {
    if (!this.$misComponents.includes(this.misName)) {
      this.error = '找不到对应的渲染器';
    }
  },
  mounted() {
    this.$eventHub.$on('mis-component:reload', this.handleReload);
  },
  methods: {
    filterAction(props, feedback) {
      if (
        (this.props.renderer === 'mis-action' && this.props.actions) ||
        (this.props.renderer === 'mis-chart' && this.footer.actionType)
      ) {
        if (props && ['mis-submit', 'mis-reset'].includes(props.actionType)) {
          return this.action();
        }
        return this.dispatchAction(props, feedback);
      } else if (['mis-submit', 'mis-reset'].includes(this.props.actionType)) {
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
        case 'mis-dialog':
          this.handleShowPopup(props);
          break;
        case 'mis-drawer':
          this.handleShowPopup(props);
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
    handleShowPopup(props) {
      this.$eventHub.$emit('mis-portal:create', this.path, {
        body: props.body || this.body,
        data: props.data || this.data,
        actionType: props.actionType,
        visible: true,
      });
    },
  },
};
</script>
