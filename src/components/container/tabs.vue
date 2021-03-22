<template>
  <el-tabs
    v-model="iData.iActiveTab"
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
            :init-data="getInitData(iData, item)"
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
              :init-data="getInitData(iData, child)"
            />
          </template>
        </template>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { defineComponent, watch, reactive, ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import mixinProps from '../mixin/props/tabs';

export default defineComponent({
  name: 'MisTabs',
  components: {
    ElTabs,
    ElTabPane,
  },
  mixins: [mixinProps, initApi],
  setup(props) {
    const { data } = useInitApi(props);
    const iActiveName = ref(props.activeName);
    const isPanelAlive = item => {
      if (item.keepAlive === false) {
        return data.iActiveTab === item.name;
      }
      return true;
    };
    watch(iActiveName, val => data.iActiveTab = val);

    return {
      data,
      iActiveName,
      isPanelAlive,
      ...useDerivedProp()
    };
  },
});
</script>
