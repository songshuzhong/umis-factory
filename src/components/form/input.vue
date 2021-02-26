<template>
  <el-input
    v-model="iValue"
    :name="name"
    :label="label"
    :type="type"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :minlength="minlength"
    :maxlength="maxlength"
    :clearable="clearable"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    :placeholder="placeholder"
    :show-password="showPassword"
    :show-word-limit="showWordLimit"
    @change="onChange"
  >
    <template v-if="append" #append>
      <mis-component
        :mis-name="append.renderer"
        :path="`${path}/${append.renderer}`"
        :props="getFattingProps(append, data)"
        :header="getHeader(append)"
        :body="getBody(append)"
        :footer="getFooter(append)"
        :init-data="derivedDataProp"
        v-bind="getFattingProps(append)"
      />
    </template>
  </el-input>
</template>

<script>
import { ElInput } from 'element-plus';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisInput',
  components: {
    ElInput,
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
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    minlength: {
      type: Number,
      required: false,
    },
    maxlength: {
      type: Number,
      required: false,
    },
    showWordLimit: {
      type: Boolean,
      required: false,
    },
    showPassword: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
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
    prefixIcon: {
      type: String,
      required: false,
    },
    suffixIcon: {
      type: String,
      required: false,
    },
    append: {
      type: Object,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      iValue: '',
    };
  },
  computed: {
    derivedDataProp() {
      const data = {};
      data[this.name] = this.iValue;
      return data;
    },
  },
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
  },
  mixins: [initData, derivedProp],
  methods: {
    onChange(val) {
      this.updateValue && this.updateValue(val);
    },
  },
};
</script>
