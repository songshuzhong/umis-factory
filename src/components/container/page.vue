<template>
  <div
    class="umis-page__container"
    :class="classname"
  >
    <template v-if="Object.prototype.toString.call(body) === '[object Array]'">
      <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
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
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
    />
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance } from 'vue';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import useDerivedProp from '../mixin/useDerivedProp';
import mixinProps from '../mixin/props/page';

export default defineComponent({
  name: 'MisPage',
  mixins: [mixinProps, initApi],
  setup(props) {
    const { proxy } = getCurrentInstance();
    return {
      ...useDerivedProp(),
      ...useInitApi(props)
    };
  }
});
</script>
