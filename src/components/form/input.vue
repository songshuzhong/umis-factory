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
import { defineComponent, computed, ref } from 'vue';
import { ElInput } from 'element-plus';
import derivedProp from '../mixin/useDerivedProp';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/input';

export default defineComponent({
  name: 'MisInput',
  components: {
    ElInput,
  },
  mixins: [mixinProps, initData, derivedProp],
  setup(props) {
    const iValue = ref(props.value);
    const derivedDataProp = computed(() => {
      const data = {};
      data[props.name] = iValue.value;
      return data;
    });
    const onChange = val => {
      props.updateValue && props.updateValue(val);
    };

    return {
      iValue,
      derivedDataProp,
      onChange
    };
  }
});
</script>
