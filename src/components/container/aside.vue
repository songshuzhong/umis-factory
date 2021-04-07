<template>
  <el-aside :class="classname" :width="`${data.width}px`">
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template
        v-for="(child, index) in body"
        :key="index"
      >
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
    <mis-component
      v-else-if="Object.prototype.toString.call(body) === '[object Object]'"
      v-bind="getFattingProps(body)"
      :mis-name="body.renderer"
      :path="`${path}/body/${body.renderer}`"
      :props="getFattingProps(body)"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :init-data="getInitData(data, body)"
    />
  </el-aside>
</template>

<script>
import { defineComponent, onBeforeUpdate, getCurrentInstance } from 'vue';
import { ElAside } from 'element-plus';
import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import useLinkage from '../mixin/useLinkage';
import initApi from '../mixin/props/init-api';
import mixinProps from '../mixin/props/aside';

export default defineComponent({
  name: 'MisAside',
  components: {
    ElAside,
  },
  mixins: [mixinProps, initApi],
  setup(props) {
    const { ctx } = getCurrentInstance();

    onBeforeUpdate(() => {
      console.log(ctx.data);
    });
    return {
      ...useInitApi(props),
      ...useLinkage(props, ctx.data),
      ...useDerivedProp()
    }
  }
});
</script>
