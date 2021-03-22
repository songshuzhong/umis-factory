<template>
  <el-select
    v-model="iValue"
    :name="name"
    :size="size"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :filterable="filterable"
    :placeholder="placeholder"
    @change="onChange"
    @clear="onClear"
  >
    <el-option
      v-for="option in iOptions"
      :key="option.value"
      :label="option.text"
      :value="getJoinValue(option)"
      :disabled="option.disabled"
    />
  </el-select>
</template>
<script>
import { defineComponent, watch, ref, reactive } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import initApi from '../mixin/useInitApi';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/select';
import cache from '../mixin/cache';

export default defineComponent({
  name: 'MisSelect',
  components: {
    ElSelect,
    ElOption,
  },
  mixins: [mixinProps, initApi, initData, cache],
  setup(props) {
    const iClear = ref(false);
    const iValue = reactive(props.value);
    const iOptions = reactive(props.options);
    const onChange = val => {
      iValue.value = val;
      iClear.value = false;
      props.handleLinkage();
    };
    const onClear = () => {
      iClear.value = true;
    };
    const getJoinValue = (option) => {
      if (props.joinValue) {
        return { value: option.value, text: option.text };
      }
      return option.value;
    };
    const handleLinkage = () => {
      if (props.target) {
        const linkage = {};
        linkage[props.name] = iValue.value;
        props.linkageTrigger(props.target, linkage);
      }
    };
    watch(iValue, (val, old) => {
      if (event && event.target.nodeName === 'I') {
        iClear.value = true;
      }
      // this.handleCache({field: {value, oldValue, iClear: this.iClear}, form: this.data});
      props.updateValue && props.updateValue(val);
    });
    // watch(rows, val => iOptions.value = val);

    return {
      iClear,
      iOptions,
      iValue,
      onChange,
      onClear,
      getJoinValue,
      handleLinkage
    };
  },
});
</script>
