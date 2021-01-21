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
  >
    <el-option
      v-for="option in iOptions"
      :key="option.value"
      :label="option.text"
      :value="getJoinValue(option)"
      :disabled="option.disabled"
    >
    </el-option>
  </el-select>
</template>
<script>
import { ElSelect, ElOption } from 'element-plus';
import initApi from '../mixin/init-api';

export default {
  name: 'MisSelect',
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Array, String, Number],
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
    joinValue: {
      type: Boolean,
      required: false,
    },
    filterable: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      iValue: [],
      iOptions: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
    iValue: {
      handler(val) {
        this.$emit('input', val);
      },
    },
    options: {
      handler(val) {
        if (val && val.length) {
          this.iOptions = val;
        }
      },
      immediate: true,
      deep: true,
    },
    rows: {
      handler(val) {
        if (val && val.length) {
          this.iOptions = val;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [initApi],
  methods: {
    onChange(val) {
      this.iValue = val
      if (this.target) {
        const linkage = {};
        linkage[this.name] = val;
        this.linkageTrigger(this.target, linkage);
      }
    },
    getJoinValue(option) {
      if (this.joinValue) {
        return { value: option.value, text: option.text };
      }
      return option.value;
    },
  },
};
</script>
