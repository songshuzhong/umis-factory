<template>
  <el-main :class="[classname, iComputedClass]">
    <router-view
      v-if="routerView"
      :init-data="getInitData(data)"
    />
    <template v-else>
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            v-bind="getFattingProps(child)"
            :mis-name="child.renderer"
            :path="`${path}/body/${index}/${child.renderer}`"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :props="getFattingProps(child)"
            :init-data="getInitData(data, child)"
          />
        </template>
      </template>
      <mis-component
        v-else-if="Object.prototype.toString.call(body) === '[object Object]'"
        v-bind="getFattingProps(body)"
        :mis-name="body.renderer"
        :path="`${path}/body/${body.renderer}`"
        :track="`${path}/body/${body.renderer}`"
        :track-id="body.renderer"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :props="getFattingProps(body)"
        :init-data="getInitData(data, body)"
      />
    </template>
    <div v-if="iProtal">
      <template
        v-for="({ actionType, body, data, visible }, path) in popMap"
        :key="path"
      >
        <component
          :is="actionType"
          v-bind="body"
          :path="path"
          :track="path"
          :track-id="actionType"
          :visible="visible"
          :init-data="data"
          :on-popup-invisible="destroyProtal"
        />
      </template>
    </div>
  </el-main>
</template>

<script>
import { defineComponent, computed, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { ElMain } from 'element-plus';
import clonedeep from "lodash.clonedeep";

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/main';

export default defineComponent({
  name: 'MisMain',
  components: {
    ElMain,
  },
  mixins: [mixinProps, derivedProp, initData],
  setup(props) {
    const { ctx } = getCurrentInstance();
    let popMap = ref({});
    const iComputedClass = computed(() => {
      if (props.computedClass) {
        return ctx.$onExpressionEval(props.computedClass, props.initData);
      }
      return '';
    });
    const createProtal = (path, pop) => {
      popMap.value[path] = pop
    };

    const destroyProtal = (path) => {
      delete popMap.value[path]
    };

    onMounted(() => {
      ctx.$eventHub.$on('mis-portal:create', createProtal);
      ctx.$eventHub.$on('mis-portal:destroy', destroyProtal);
    });

    return {
      popMap,
      iComputedClass,
      destroyProtal
    };
  }
});
</script>
