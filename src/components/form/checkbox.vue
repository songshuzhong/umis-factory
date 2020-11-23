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
import {CheckboxGroup as ElCheckboxGroup} from 'element-ui';
import {Checkbox as ElCheckbox} from 'element-ui';
import {CheckboxButton as ElCheckboxButton} from 'element-ui';

export default {
  name: 'MisCheckbox',
  components: {
    ElCheckboxGroup,
    ElCheckboxButton,
    ElCheckbox,
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
    type: {
      type: String,
      required: false,
      default: 'checkbox',
      options: ['checkbox', 'button'],
    },
    value: {
      type: [Array, String, Number],
      required: false,
    },
  },
  data() {
    return {
      iValue: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
  },
  methods: {
    onSelect() {
      this.$emit('input', this.iValue);
    },
  },
};
</script>
