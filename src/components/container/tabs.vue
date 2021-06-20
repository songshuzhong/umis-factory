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
      <template #label>
        <i v-if="item.icon" :class="item.icon" />
        {{ item.label }}
      </template>
      <template v-if="isPanelAlive(item)">
        <template
          v-if="Object.prototype.toString.call(item.body) === '[object Object]'"
        >
          <mis-component
            v-bind="getFattingProps(item.body)"
            :mis-name="item.body.renderer"
            :path="`${path}/body/${index}/${item.body.renderer}`"
            :props="getFattingProps(item.body)"
            :header="getHeader(item.body)"
            :body="getBody(item.body)"
            :footer="getFooter(item.body)"
            :init-data="getInitData(data, item)"
          />
        </template>
        <template v-else>
          <template v-for="(child, index) in item.body" :key="`${path}/${index}/${child.renderer}`">
            <mis-component
              v-bind="getFattingProps(child)"
              :mis-name="child.renderer"
              :path="`${path}/body/${index}/${child.renderer}`"
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
import { defineComponent, watch } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/tabs';

export default defineComponent({
  name: 'MisTabs',
  components: {
    ElTabs,
    ElTabPane,
  },
  data() {
    return {
      data: {
        iActiveTab: '',
      },
    };
  },
  mixins: [mixinProps, derivedProp, initData],
  setup(props) {
    watch: {
      activeName: {
        handler(val) {
          this.data.iActiveTab = val;
        },
        immediate: true,
      },
    },
    watch(props.activeName, () => {})
    const isPanelAlive = item => {
      if (item.keepAlive === false) {
        return this.data.iActiveTab === item.name;
      }
      return true;
    };

    return {
      isPanelAlive
    }
  },
});
</script>
