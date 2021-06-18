<template>
  <el-switch
    v-model="iValue"
    :disabled="disabled"
    :width="width"
    :active-icon-class="activeIconClass"
    :active-text="activeText"
    :inactive-text="inActiveText"
    :active-value="activeValue"
    :inactive-value="inActiveValue"
    :active-color="activeColor"
    :inactive-color="inActiveColor"
    @change="onChange"
  />
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance, watch, ref } from 'vue';
import { ElSwitch } from 'element-plus';
import mixinProps from '../mixin/props/switch';

export default defineComponent({
  name: 'MisSwitch',
  components: {
    ElSwitch
  },
  mixins: [mixinProps],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const iValue = ref(props.value);
    const onChange = val => {
      iValue.value = val;
      props.updateValue && props.updateValue(val);

      if (props.target) {
        const linkage = {};
        linkage[props.name] = iValue.value;
        props.linkageTrigger && props.linkageTrigger(props.target, linkage);
      }
    };
    const handleRemoteClick = (actionType, target, feedback) => {
      if (target && target === props.name) {
        const linkage = {};
        iValue.value = !iValue.value;
        props.updateValue && props.updateValue(iValue.value);
        linkage[props.name] = iValue.value;
        props.linkageTrigger && props.linkageTrigger(props.target, linkage);
        feedback();
      }
    };

    onMounted(() => {
      ctx.$eventHub.$on('mis-component:remoteComponent', handleRemoteClick);
    });

    return {
      iValue,
      onChange,
      handleRemoteClick
    };
  }
});
</script>
