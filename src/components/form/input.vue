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
import mixinProps from '../mixin/props/input';

export default {
  name: 'MisInput',
  components: {
    ElInput,
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
  mixins: [mixinProps, initData, derivedProp],
  methods: {
    onChange(val) {
      this.updateValue && this.updateValue(val);
    },
  },
};
</script>
