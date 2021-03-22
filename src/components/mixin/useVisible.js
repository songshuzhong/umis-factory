import { computed, getCurrentInstance } from 'vue';

export default function (props) {
  const { ctx } = getCurrentInstance();

  const iHidden = computed(() => {
    if (props.hiddenOn) {
      return !ctx.$onExpressionEval(props.hiddenOn, ctx.data);
    }
    return true;
  });
  const iVisible = computed(() => {
    if (props.visibleOn) {
      return ctx.$onExpressionEval(props.visibleOn, ctx.data);
    }
    return true;
  });
  const iDisabled = computed(() => {
    if (props.disabledOn) {
      return ctx.$onExpressionEval(props.disabledOn, ctx.data);
    }
    return false;
  });

  return {
    iHidden,
    iVisible,
    iDisabled
  };
}
