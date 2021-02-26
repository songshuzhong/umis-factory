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
import { ElSelect, ElOption } from 'element-plus';
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';
import cache from '../mixin/cache';

export default {
  name: 'MisSelect',
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    options: {
      type: Array,
      required: false,
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
    cached: {
      type: Object,
      required: false,
      default: {}
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      iValue: [],
      iOptions: [],
      iClear: false
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
      handler(value, oldValue) {
        if (event && event.target.nodeName === 'I') {
          this.iClear = true;
        }
        this.handleCache({field: {value, oldValue, iClear: this.iClear}, form: this.data});
        this.updateValue && this.updateValue(value);
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
  mixins: [initApi, initData, cache],
  methods: {
    onChange(val) {
      this.iValue = val;
      this.iClear = false;
      this.handleLinkage();
    },
    onClear() {
      this.iClear = true;
    },
    getJoinValue(option) {
      if (this.joinValue) {
        return { value: option.value, text: option.text };
      }
      return option.value;
    },
    handleLinkage() {
      if (this.target) {
        const linkage = {};
        linkage[this.name] = this.iValue;
        this.linkageTrigger(this.target, linkage);
      }
    },
  },
};
</script>
