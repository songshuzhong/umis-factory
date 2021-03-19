<template>
  <el-checkbox-group v-model="iValue" :name="name" @change="onChange">
    <template
      v-for="(option, index) in options"
      :key="index"
    >
      <component
        :is="type === 'button' ? 'el-checkbox-button' : 'el-checkbox'"
        :label="option.value"
      >
        {{ option.text }}
      </component>
    </template>
  </el-checkbox-group>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { ElCheckboxGroup, ElCheckboxButton, ElCheckbox } from 'element-plus';
import mixinProps from '../mixin/props/checkbox';

export default defineComponent({
  name: 'MisCheckbox',
  components: {
    ElCheckboxGroup,
    ElCheckboxButton,
    ElCheckbox,
  },
  mixins: [mixinProps],
  setup(props) {
    const iValue = reactive(props.value || []);
    const onChange = val => {
      props.updateValue && props.updateValue(val);
    };

    return {
      iValue,
      onChange
    };
  },
});
</script>
