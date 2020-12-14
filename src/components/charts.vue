<template>
  <v-chart v-loading="iApiLoading" :options="iOptions" />
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

import initData from './mixin/init-data';
import initApi from './mixin/init-api';

export default {
  name: 'MisCharts',
  components: {
    'v-chart': VChart,
  },
  data() {
    return {
      iOptions: {},
    };
  },
  watch: {
    data: {
      handler(val) {
        this.iOptions = val;
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [initData, initApi],
};
</script>
