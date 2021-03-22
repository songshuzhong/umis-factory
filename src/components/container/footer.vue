<template>
  <el-footer :class="classname">
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
      v-else-if="Object.prototype.toString.call(body) === '[object Object]'"
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
  </el-footer>
</template>

<script>
import { defineComponent } from 'vue';
import { ElFooter } from 'element-plus';
import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import mixinProps from '../mixin/props/footer';

export default defineComponent({
  name: 'MisMain',
  components: {
    ElFooter,
  },
  mixins: [mixinProps, initApi],
  setup(props) {
    return {
      ...useInitApi(props),
      ...useDerivedProp()
    }
  }
});
</script>
