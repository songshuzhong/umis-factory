<template>
  <div>
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
      <template v-for="(item, index) in header" :key="index">
        <el-step
          :title="item.title"
          :icon="item.icon"
          :status="item.status"
          :description="item.description"
        />
      </template>
    </el-steps>
    <div>
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
        <mis-component
          :mis-name="child.renderer"
          :path="`${path}/${index}/${child.renderer}`"
          :hidden-on="getHiddenOn(child, index)"
          :props="getFattingProps(child)"
          :transition="'el-fade-in-linear'"
        />
      </template>
    </div>
    <div class="el-card__footer">
      <template v-for="(item, index) in footer" :key="`${path}/${index}/${item.renderer}`">
        <mis-component
          :path="`${path}/${index}/${item.renderer}`"
          :mis-name="item.renderer"
          :name="item.name"
          :props="item"
          :init-data="data"
          :hidden-on="item.hiddenOn"
          :visible-on="item.visibleOn"
          :disabled-on="activeStatus(item.actionType)"
          :action="onActiveChanged"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { ElCard, ElSteps, ElStep } from 'element-plus';

import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';
import initApi from './mixin/init-api';

export default {
  name: 'MisSteps',
  components: {
    ElCard,
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
    header: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    footer: {
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
  mixins: [initApi, initData, derivedProp],
  methods: {
    activeStatus(actionType) {
      if (actionType === 'mis-next') {
        return `data.active >= ${this.body.length}`;
      } else if (actionType === 'mis-previous') {
        return `data.active <= 0`;
      }
    },
    getHiddenOn(item, index) {
      return `${this.data.active} !== ${index}`;
    },
    onActiveChanged() {
      const attributes = event.currentTarget.attributes;
      if (attributes.actionType && attributes.actionType.value === 'mis-next') {
        if (this.data.active < this.body.length) {
          this.data.active = this.data.active + 1;
        }
      } else if (
        attributes.actionType &&
        attributes.actionType.value === 'mis-previous'
      ) {
        if (this.data.active > 0) {
          this.data.active = this.data.active - 1;
        }
      }
    },
  },
};
</script>
