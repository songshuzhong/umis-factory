<template>
  <el-carousel
    :initial-index="initialIndex"
    :trigger="trigger"
    :autoplay="autoplay"
    :interval="interval"
    :indicator-position="indicatorPosition"
    :arrow="arrow"
    :type="type"
    :loop="loop"
    :direction="direction"
  >
    <el-carousel-item v-for="(item, index) in body" :key="index">
      <mis-component
        :mis-name="item.renderer"
        :path="`${path}/${index}/${item.renderer}`"
        :body="getBody(item)"
        :header="getHeader(item)"
        :footer="getFooter(item)"
        :props="getFattingProps(item)"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import {
  Carousel as ElCarousel,
  CarouselItem as ElCarouselItem,
} from 'element-ui';

import initApi from './mixin/init-api';
import initData from './mixin/init-data';
import derivedProp from './mixin/derived-prop';

export default {
  name: 'MisCarousel',
  components: {
    ElCarousel,
    ElCarouselItem,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 150,
    },
    initialIndex: {
      type: Number,
      required: false,
      default: 0,
    },
    trigger: {
      type: String,
      required: false,
    },
    autoplay: {
      type: Boolean,
      required: false,
    },
    interval: {
      type: Number,
      required: false,
    },
    indicatorPosition: {
      type: String,
      required: false,
      default: 'outside',
    },
    arrow: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    loop: {
      type: Boolean,
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
  },
  mixins: [initApi, initData, derivedProp],
};
</script>
