<template>
  <el-select
    v-model="iValue"
    :name="name"
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
import { Select as ElSelect } from 'element-ui';
import { Option as ElOption } from 'element-ui';
import initApi from '../mixin/initApi';

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
      required: true,
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
    onChange() {
      this.$emit('input', this.iValue);
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
