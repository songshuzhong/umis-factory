<template>
  <transition :name="transition">
    <component
      ref="component"
      :is="componentName"
      v-if="iVisible && forceRerender"
      v-show="iHidden && forceRerender"
      v-bind="getSlimmingProps(props)"
      :path="path"
      :index="index"
      :header="header"
      :body="body"
      :footer="footer"
      :init-data="data"
      :init-rows="rows"
      :error-info="errorInfo"
      :action="filterAction"
      :after-action="afterAction"
      :linkage-trigger="onLinkageTrigger"
    />
  </transition>
</template>

<script>
import copy from 'copy-to-clipboard';
import derivedProp from '../mixin/derived-prop';
import linkage from '../mixin/linkage';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';

export default {
  name: 'MisComponent',
  props: {
    path: {
      type: String,
      required: true,
    },
    index: {
      type: [String, Number],
      required: false,
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
    action: {
      type: Function,
      required: false,
    },
    afterAction: {
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
    console.error(err);
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
    filterAction(props, context, feedback) {
      if (
        (props.renderer === 'mis-action' && props.actions) ||
        (props.renderer === 'mis-chart' && props.footer.actionType)
      ) {
        if (props && ['mis-submit', 'mis-reset'].includes(props.actionType)) {
          return this.action();
        }
        return this.dispatchAction(props, context, feedback);
      } else if (['mis-submit', 'mis-reset'].includes(props.actionType)) {
        return this.action();
      } else {
        return this.dispatchAction(props, context, feedback);
      }
    },
    dispatchAction(props, context, feedback) {
      switch (props.actionType) {
        case 'mis-linkage':
          this.handleLinkageAction(props, context, feedback);
          break;
        case 'mis-ajax':
          this.handleAjaxAction(props, context, feedback);
          break;
        case 'mis-redirect':
          this.handleRedirectAction(props, context);
          break;
        case 'mis-url':
          this.handleUrlAction(props, context);
          break;
        case 'mis-copy':
          this.handleCopyAction(props, context);
          break;
        case 'mis-dialog':
          this.handleShowPopup(props, context);
          break;
        case 'mis-drawer':
          this.handleShowPopup(props, context);
          break;
      }
    },
    onReloadAction(props) {
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
    handleLinkageAction(props, context, feedback) {
      feedback();
    },
    handleAjaxAction(props, context, feedback) {
      this.$refs.component
        .handleFetchApi(props.actionApi, feedback)
        .then(status => {
          if (status === 'resolve') {
            this.onReloadAction(props);
          }
        });
    },
    handleUrlAction(props, context) {
      const url = this.$getCompiledUrl(props.url, context);
      props.blank ? window.open(url) : (window.location.href = url);
    },
    handleRedirectAction(props, context) {
      const url = this.$getCompiledUrl(props.redirect, context);
      let params = this.$getCompiledParams(props.params, context);
      if (/^https?:\/\//.test(url)) {
        window.location.replace(url);
      } else if (props.redirectType === 'routeName') {
        this.$router.push({
          name: url,
          params
        });
      } else {
        this.$router.push(url);
      }
    },
    handleCopyAction(props, context) {
      const content = this.$getCompiledUrl(props.content, context);
      copy(content);
      this.$message.success(`已复制：${content}.`);
    },
    handleShowPopup(props, context) {
      this.$eventHub.$emit('mis-portal:create', this.path, {
        body: props.body || this.body,
        data: props.data || context,
        actionType: props.actionType,
        visible: true,
      });
    },
  },
};
</script>
