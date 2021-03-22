<template>
  <el-progress
    :type="type"
    :width="width"
    :color="color"
    :status="status"
    :show-text="showText"
    :percentage="data.percentage"
    :stroke-width="strokeWidth"
    :textInside="textInside"
    :stroke-linecap="strokeLinecap"
  />
</template>

<script>
import { defineComponent, watch } from 'vue';
import { ElProgress } from 'element-plus';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisProgress',
  components: {
    ElProgress,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    percentage: {
      type: Number,
      required: true,
    },
    strokeWidth: {
      type: Number,
      required: false,
    },
    textInside: {
      type: Boolean,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
    showText: {
      type: Boolean,
      required: false,
    },
    strokeLinecap: {
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
  },
  mixins: [initApi],
  setup(props) {
    const { data } = useInitApi(props);

    watch(props.value, val => {
      data.percentage = val;
    });

    return {
      data
    };
  }
});
</script>
