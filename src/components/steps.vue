<template>
  <el-steps
    :path="path"
    :active="data.active"
    :simple="simple"
    :name="name"
    :direction="direction"
    :align-center="alignCenter"
    :finish-status="finishStatus"
    :process-status="processStatus"
  >
    <template v-for="(item, index) in body" :key="index">
      <el-step
        :title="item.title"
        :icon="item.icon"
        :status="item.status"
        :description="item.description"
      />
    </template>
  </el-steps>
</template>

<script>
import { Steps as ElSteps, Step as ElStep } from 'element-ui';

export default {
  name: 'MisSteps',
  components: {
    ElSteps,
    ElStep,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
    active: {
      type: String,
      required: false,
    },
    processStatus: {
      type: String,
      required: false,
    },
    finishStatus: {
      type: String,
      required: false,
    },
    alignCenter: {
      type: Boolean,
      required: false,
    },
    simple: {
      type: Boolean,
      required: false,
    },
    body: {
      type: Array,
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
  data() {
    return {
      data: {
        active: '',
      },
    };
  },
  watch: {
    active: {
      handler(val) {
        this.data.active = val;
      },
      immediate: true,
    },
  },
};
</script>
