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
import { defineComponent, reactive, watch } from 'vue';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import initApi from '../mixin/init-api';
import mixinProps from '../mixin/props/service';

export default defineComponent({
  name: 'MisService',
  mixins: [mixinProps, initData, initApi, derivedProp],
  setup(props) {
    const handleLinkage = () => {
      if (props.target) {
        props.linkageTrigger(props.target, props.data);
      }
    };
    watch(data, val => handleLinkage);

    return {
      handleLinkage
    };
  },
});
</script>
