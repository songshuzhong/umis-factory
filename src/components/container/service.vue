<template>
  <div
    v-loading="iApiLoading"
    :class="classname"
    class="umis-service__body"
  >
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
          :init-rows="rows"
        />
      </template>
    </template>
    <mis-component
      v-else-if="Object.prototype.toString.call(body) === '[object Object]'"
      v-bind="getFattingProps(body)"
      :path="`${path}/body/${body.renderer}`"
      :mis-name="body.renderer"
      :header="getHeader(body)"
      :body="getBody(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body, data, { rows })"
      :init-data="getInitData(data, body)"
      :init-rows="rows"
    />
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, watch } from 'vue';
import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import mixinProps from '../mixin/props/service';

export default defineComponent({
  name: 'MisService',
  mixins: [mixinProps, initApi],
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { data } = useInitApi(props);
    const handleLinkage = () => {
      if (props.target) {
        props.linkageTrigger(props.target, data);
      }
    };
    watch(data, val => handleLinkage);

    return {
      handleLinkage,
      ...useDerivedProp(),
      ...useInitApi(props, proxy)
    };
  },
});
</script>
