<template>
  <el-timeline :reverse="data.reverse">
    <el-timeline-item
      v-for="(item, index) in rows"
      :key="index"
      :timestamp="item.timestamp"
      :placement="item.placement || placement"
      :type="item.type || type"
      :color="item.color || color"
      :size="item.size || size"
      :icon="item.icon || icon"
    >
      <mis-component
        :mis-name="body.renderer"
        :path="`${path}/${index}/${body.renderer}`"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :props="getFattingProps(body)"
        :init-data="getInitData(item, body)"
      />
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import { defineComponent } from 'vue';
import { ElTimeline, ElTimelineItem } from 'element-plus';

import useInitApi from './mixin/useInitApi';
import useDerivedProp from './mixin/useDerivedProp';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisTimeline',
  components: {
    ElTimeline,
    ElTimelineItem,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    body: {
      type: Object,
      required: true,
    },
  },
  mixins: [initApi],
  setup(props) {
    return {
      ...useInitApi(props),
      ...useDerivedProp()
    };
  }
});
</script>
