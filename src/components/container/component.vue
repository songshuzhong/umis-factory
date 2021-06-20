<template>
  <transition :name="transition">
    <component
      ref="component"
      :is="componentName"
      v-if="iVisible && forceRerender"
      v-show="iHidden && forceRerender"
      v-bind="getSlimmingProps(props)"
      :path="path"
      :track="path"
      :track-id="componentName"
      :index="index"
      :class="className"
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
import { defineComponent, nextTick, computed, ref, onBeforeMount, onMounted, onErrorCaptured, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import copy from 'copy-to-clipboard';
import useVisible from '../mixin/useVisible';
import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import useLinkage from '../mixin/useLinkage';
import initApi from '../mixin/props/init-api';
import visibleProps from '../mixin/props/visible';

export default defineComponent({
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
    className: {
      type: String,
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
  mixins: [visibleProps, initApi],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const { data } = useInitApi(props);
    const { iHidden, iVisible } = useVisible(props, proxy);
    const componentRef = ref(null);
    const error = ref('');
    const forceRerender = ref(true);
    const errorInfo = computed(() => {
      if (error.value) {
        return {
          props: props,
          error: error,
        };
      }
      return {};
    });
    const componentName = computed(() => {
      return error.value ? 'mis-error' : props.misName;
    });

    const filterAction = (props, context, feedback) => {
      if (
        (props.renderer === 'mis-action' && props.actions) ||
        (props.renderer === 'mis-chart' && props.footer.actionType)
      ) {
        if (props && ['mis-submit', 'mis-reset'].includes(props.actionType)) {
          return props.action();
        }
        return dispatchAction(props, context, feedback);
      } else if (['mis-submit', 'mis-reset'].includes(props.actionType)) {
        return props.action();
      } else {
        return dispatchAction(props, context, feedback);
      }
    };

    const dispatchAction = (props, context, feedback) => {
      switch (props.actionType) {
        case 'mis-linkage':
          handleLinkageAction(props, context, feedback);
          break;
        case 'mis-ajax':
          handleAjaxAction(props, context, feedback);
          break;
        case 'mis-redirect':
          handleRedirectAction(props, context);
          break;
        case 'mis-url':
          handleUrlAction(props, context);
          break;
        case 'mis-copy':
          handleCopyAction(props, context);
          break;
        case 'mis-dialog':
          handleShowPopup(props, context);
          break;
        case 'mis-drawer':
          handleShowPopup(props, context);
          break;
        case 'mis-fullscreen':
          handleFullScreen(props, context);
          break;
        case '':
          handleHalfScreen(props, context);
          break;
      }
    };

    const onReloadAction = (props) => {
      const { reload } = props;
      if (reload) {
        proxy.$eventHub.$emit('mis-component:reload', reload);
      }
    };

    const handleReload = (target) => {
      if (target === 'window') {
        window.location.reload();
      } else if (props && target === props.name) {
        forceRerender.value = false;
        nextTick(() => (forceRerender.value = true));
      }
    };

    const handleLinkageAction = (props, context, feedback) => {
      feedback();
    };

    const handleAjaxAction = (props, context, feedback) => {
      componentRef.value
        .handleFetchApi(props.actionApi, feedback)
        .then(status => {
          if (status === 'resolve') {
            onReloadAction(props);
          }
        });
    };

    const handleUrlAction = (props, context) => {
      const url = proxy.$getCompiledUrl(props.url, context);
      props.blank ? window.open(url) : (window.location.href = url);
    };

    const handleRedirectAction= (props, context) => {
      const url = proxy.$getCompiledUrl(props.redirect, context);
      let params = proxy.$getCompiledParams(props.params, context);
      if (/^https?:\/\//.test(url)) {
        window.location.replace(url);
      } else if (props.redirectType === 'routeName') {
        router.push({
          name: url,
          params
        });
      } else {
        router.push(url);
      }
    };

    const handleCopyAction = (props, context) => {
      const content = proxy.$getCompiledUrl(props.content, context);
      copy(content);
      proxy.$message.success(`已复制：${content}.`);
    };

    const handleShowPopup = (props, context) => {
      proxy.$eventHub.$emit('mis-portal:create', props.path, {
        body: props.body || props.body,
        data: data || context,
        actionType: props.actionType,
        visible: true,
      });
    };

    const handleFullScreen = (props, context) => {
      const ele = props.target || document.body;
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
      }
    };

    const handleHalfScreen = () => {
      if(document.exitFullScreen) {
        document.exitFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };

    onBeforeMount(() => {
      try {
        const misName = props.misName
          .split('-')
          .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
          .join('');
        if (!proxy.$.appContext.components[misName]) {
          error.value = '找不到对应的渲染器';
        }
      } catch (e) {
        console.log(props)
      }
    });

    onMounted(() => {
      proxy.$eventHub.$on('mis-component:reload', handleReload);
    });

    onErrorCaptured((err, vm, info) => {
      error.value = `'${err.message}' is found in ${info} of ${props.misName} component`;
      console.error(err);
      return false;
    });

    return {
      error,
      errorInfo,
      forceRerender,
      componentName,
      iHidden,
      iVisible,
      filterAction,
      ...useInitApi(props),
      ...useLinkage(props, data),
      ...useDerivedProp()
    };
  },
});
</script>
