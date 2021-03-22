<template>
  <el-input-number
    v-model="data.percentage"
    :min="min"
    :max="max"
    :size="size"
    :name="name"
    :label="label"
    :disabled="disabled"
    :precision="precision"
    :placeholder="placeholder"
    :controls-position="controlsPosition"
    @change="handleChange"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { ElInputNumber } from 'element-plus';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisNumber',
  components: {
    ElInputNumber,
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
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
    precision: {
      type: Number,
      required: false,
    },
    stepStrictly: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    controlsPosition: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: true,
    },
  },
  mixins: [initApi],
  setup(props) {
    const handleChange = (value) => {
      if (props.target) {
        const triggerData = {};
        triggerData[props.name] = value;
        props.linkageTrigger(props.target, triggerData);
      }
    };

    return {
      handleChange,
      ...useInitApi(props)
    };
  }
});
</script>
