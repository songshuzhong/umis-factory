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
    <template v-if="append" slot="append">
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
import { Input as ElInput } from 'element-ui';
import derivedProp from '../mixin/derived-prop';

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
      required: true,
    },
    type: {
      type: String,
      required: true,
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
      required: true,
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: String,
      required: true,
    },
    prefixIcon: {
      type: String,
      required: true,
    },
    suffixIcon: {
      type: String,
      required: true,
    },
    rows: {
      type: Number,
      required: false,
    },
    append: {
      type: Object,
      required: false,
    },
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
  mixins: [derivedProp],
  methods: {
    onChange(val) {
      this.$emit('input', val);
    },
  },
};
</script>
