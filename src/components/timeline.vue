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
        :init-data="getInitData(data, body)"
      />
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import { Timeline as ElTimeline } from 'element-ui';
import { TimelineItem as ElTimelineItem } from 'element-ui';

import initApi from './mixin/init-api';
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';

export default {
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
  mixins: [initApi, initData, derivedProp],
};
</script>
