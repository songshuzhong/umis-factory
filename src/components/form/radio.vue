<template>
  <el-radio-group v-model="iValue" :name="name" @change="onChange">
    <component
      v-for="(option, index) in options"
      :key="index"
      :is="type === 'button'? 'ElRadioButton': 'ElRadio'"
      :label="option.value"
    >
      {{ option.text }}
    </component>
  </el-radio-group>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import { ElRadioGroup, ElRadioButton, ElRadio } from 'element-plus';
import initData from '../mixin/init-data';
import cache from '../mixin/cache';
import mixinProps from '../mixin/props/radio';

export default defineComponent({
  name: 'MisRadio',
  components: {
    ElRadioGroup,
    ElRadioButton,
    ElRadio,
  },
  mixins: [mixinProps, initData, cache],
  setup(props) {
    const iValue = ref(props.value);
    const onChange = val => {
      iValue.value = val;
      if (props.target) {
        const linkage = {};
        linkage[props.name] = value;
        props.linkageTrigger(props.target, linkage);
      }
    };

    watch(iValue, (val, old) => {
      if (val !== old) {
        // handleCache({field: {value, old}, form: ctx.data});
      }
      props.updateValue && props.updateValue(val);
    });

    return {
      iValue,
      onChange
    };
  },
});
</script>
