<template>
  <el-tabs
    v-model="data.iActiveTab"
    :path="`${path}`"
    :type="type"
    :style="tabStyle"
    :stretch="stretch"
    :tab-position="tabPosition"
  >
    <el-tab-pane
      v-for="(item, index) in body"
      :key="`${path}/${index}`"
      :label="item.label"
      :name="item.name"
      :lazy="true"
      v-bind="getFattingProps(item)"
    >
      <span slot="label">
        <i v-if="item.icon" :class="item.icon" />
        {{ item.label }}
      </span>
      <template v-if="isPanelAlive(item)">
        <template
          v-if="Object.prototype.toString.call(item.body) === '[object Object]'"
        >
          <mis-component
            :mis-name="item.body.renderer"
            :path="`${path}/${index}/${item.body.renderer}`"
            :props="getFattingProps(item.body)"
            :header="getHeader(item.body)"
            :body="getBody(item.body)"
            :footer="getFooter(item.body)"
            :init-data="getInitData(data, item)"
          />
        </template>
        <template v-else>
          <template v-for="(child, index) in item.body">
            <mis-component
              :mis-name="child.renderer"
              :key="`${path}/${index}/${child.renderer}`"
              :path="`${path}/${index}/${child.renderer}`"
              :props="getFattingProps(child)"
              :header="getHeader(child)"
              :body="getBody(child)"
              :footer="getFooter(child)"
              :init-data="getInitData(data, child)"
            />
          </template>
        </template>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { Tabs as ElTabs, TabPane as ElTabPane } from 'element-ui';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisTabs',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    tabStyle: {
      type: Object,
      required: false,
    },
    tabPosition: {
      type: String,
      required: false,
      options: ['left', 'right', 'top', 'bottom'],
    },
    stretch: {
      type: Boolean,
      required: false,
      default: false,
    },
    activeName: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: {
        iActiveTab: '',
      },
    };
  },
  mixins: [derivedProp, initData],
  watch: {
    activeName: {
      handler(val) {
        this.data.iActiveTab = val;
      },
      immediate: true,
    },
  },
  methods: {
    isPanelAlive(item) {
      if (item.keepAlive === false) {
        return this.data.iActiveTab === item.name;
      }
      return true;
    },
  },
};
</script>
