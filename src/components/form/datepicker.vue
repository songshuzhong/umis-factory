<template>
  <el-date-picker
    v-model="iValue"
    :name="name"
    :type="type"
    :readonly="readonly"
    :disabled="disabled"
    :editable="editable"
    :clearable="clearable"
    :size="size"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :default-value="defaultValue"
    :format="format"
    :align="align"
    :prefix-icon="prefixIcon"
    :unlink-panels="unlinkPanels"
    :clear-icon="clearIcon"
    @change="onChange"
  />
</template>
<script>
import {defineComponent, reactive} from 'vue';
import { ElDatePicker } from 'element-plus';
import mixinProps from '../mixin/props/datepicker';

export default defineComponent({
  name: 'MisDatePicker',
  components: {
    ElDatePicker,
  },
  mixins: [mixinProps],
  setup(props) {
    const iValue = reactive(props.value || []);
    const onChange = val => {
      props.updateValue && props.updateValue(val);
    };

    return {
      iValue,
      onChange
    };
  },
});
</script>
