<template>
  <el-header :class="[classname, iComputedClass]" :height="`${iHeight}px`">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
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
      v-if="Object.prototype.toString.call(body) === '[object Object]'"
      v-bind="getFattingProps(body)"
      :mis-name="body.renderer"
      :key="`${path}/${body.renderer}`"
      :path="`${path}/body/${body.renderer}`"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </el-header>
</template>

<script>
import { defineComponent, ref, computed, watch, getCurrentInstance } from 'vue';
import { ElHeader } from 'element-plus';

import useDerivedProp from '../mixin/useDerivedProp';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/header';

export default defineComponent({
  name: 'MisHeader',
  components: {
    ElHeader,
  },
  mixins: [mixinProps, initData],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const iHeight = ref(60);
    const iComputedClass = computed(() => {
      if (props.computedClass) {
        return ctx.$onExpressionEval(props.computedClass, props.initData);
      }
      return '';
    });

    watch(props.height, val => {
      if (val) {
        iHeight.value = val;
      }
    }, { immediate:true });

    return {
      iHeight,
      iComputedClass,
      ...useDerivedProp()
    };
  }
});
</script>
