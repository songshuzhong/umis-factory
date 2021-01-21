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
import { ElRadioGroup, ElRadioButton, ElRadio } from 'element-plus';

export default {
  name: 'MisRadio',
  components: {
    ElRadioGroup,
    ElRadioButton,
    ElRadio,
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
      default: 'radio',
      options: ['radio', 'button'],
    },
    value: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: true,
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
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
    iValue: {
      handler(val) {
        if (val) {
          this.updateValue(val);
        }
      }
    }
  },
  methods: {
    onChange(value) {
      this.iValue = value;
      if (this.target) {
        const linkage = {};
        linkage[this.name] = value;
        this.linkageTrigger(this.target, linkage);
      }
    },
  },
};
</script>
