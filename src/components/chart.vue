<template>
  <v-chart v-loading="iApiLoading" :options="data" @click="handleClick" />
</template>
<script>
import VChart from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataset';
import 'echarts/lib/component/markArea';

import initData from './mixin/init-data';
import initApi from './mixin/init-api';
import derivedProp from './mixin/derived-prop';

export default {
  name: 'MisChart',
  components: {
    'v-chart': VChart,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    actions: {
      type: Object,
      required: true,
    },
  },
  mixins: [derivedProp, initData, initApi],
  methods: {
    handleClick(data) {
      const { $vars, encode, event, dimensionNames, ...other } = data;
      this.action(this.actions, other);
    },
  },
};
</script>
