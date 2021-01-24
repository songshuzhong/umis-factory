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
export default {
  name: 'MisDatePicker',
  components: {
    ElDatePicker,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    editable: {
      type: Boolean,
      required: false,
      default: true,
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    startPlaceholder: {
      type: String,
      required: false,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      required: false,
      default: '结束日期'
    },
    rangeSeparator: {
      type: String,
      required: false,
      default: '至'
    },
    defaultValue: {
      type: Date,
      required: false,
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY年MM月DD日'
    },
    align: {
      type: String,
      required: false,
    },
    prefixIcon: {
      type: String,
      required: false,
    },
    unlinkPanels: {
      type: Boolean,
      required: false,
    },
    clearIcon: {
      type: String,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      iValue: '',
    };
  },
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
