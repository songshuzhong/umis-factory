import { computed, getCurrentInstance } from 'vue';

export default function (props) {
  const { proxy } = getCurrentInstance();

  const iHidden = computed(() => {
    if (props.hiddenOn) {
      return !proxy.$onExpressionEval(props.hiddenOn, proxy.data);
    }
    return true;
  });
  const iVisible = computed(() => {
    if (props.visibleOn) {
      return proxy.$onExpressionEval(props.visibleOn, proxy.data);
    }
    return true;
  });
  const iDisabled = computed(() => {
    if (props.disabledOn) {
      return proxy.$onExpressionEval(props.disabledOn, proxy.data);
    }
    return false;
  });

  return {
    iHidden,
    iVisible,
    iDisabled
  };
}
