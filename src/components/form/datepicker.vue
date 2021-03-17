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
import { ElDatePicker } from 'element-plus';
import mixinProps from '../mixin/props/datepicker';

export default {
  name: 'MisDatePicker',
  components: {
    ElDatePicker,
  },
  data() {
    return {
      iValue: '',
    };
  },
  mixins: [mixinProps],
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    onChange(val) {
      this.updateValue && this.updateValue(val);
    },
  },
};
</script>
