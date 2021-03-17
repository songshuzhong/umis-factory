<template>
  <el-checkbox-group v-model="iValue" :name="name">
    <template v-if="type === 'button'">
      <el-checkbox-button
        v-for="(option, index) in options"
        :key="index"
        :label="option.value"
        @change="onSelect"
      >
        {{ option.text }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="(option, index) in options"
        :key="index"
        :label="option.value"
        @change="onSelect"
      >
        {{ option.text }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script>
import { ElCheckboxGroup, ElCheckboxButton, ElCheckbox } from 'element-plus';
import mixinProps from '../mixin/props/checkbox';

export default {
  name: 'MisCheckbox',
  components: {
    ElCheckboxGroup,
    ElCheckboxButton,
    ElCheckbox,
  },
  data() {
    return {
      iValue: [],
    };
  },
  mixins: [mixinProps],
  watch: {
    value: {
      handler(val) {
        this.iValue = val || [];
      },
      immediate: true,
    },
  },
  methods: {
    onSelect() {
      this.updateValue && this.updateValue(this.iValue);
    },
  },
};
</script>
