<template>
  <v-chart
    v-loading="iApiLoading"
    :id="path"
    :option="data"
    :style="{height: `${defaultHeight}px`}"
    :show-loading="false"
    @click="handleClick"
  />
</template>
<script>
  import {defineComponent, onMounted, ref} from 'vue';
  import {VEcharts as VChart} from 'vue3-echarts';
  /*import 'echarts/lib/chart/bar';
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
  import 'echarts/lib/component/markArea';*/

  import initApi from './mixin/props/init-api';
  import useInitApi from './mixin/useInitApi';
  import useDerivedProp from './mixin/useDerivedProp';

  export default defineComponent({
    name: 'MisChart',
    components: {
      VChart,
    },
    props: {
      name: {
        type: String,
        required: false,
        edit: {
          renderer: 'mis-input',
          tip: '唯一名称，字母数字下划线构成'
        }
      },
      path: {
        type: String,
        required: true,
      },
      action: {
        type: Function,
        required: false,
      },
      actions: {
        type: Object,
        required: false,
      },
    },
    mixins: [initApi],
    setup(props, context) {
      const defaultHeight = ref(200);

      const handleClick = (data) => {
        if (!props.action) {
          return;
        }
        const {$vars, encode, event, dimensionNames, ...other} = data;
        props.action(props.actions, other);
      };

      onMounted(() => {
        defaultHeight.value = document.getElementById(props.path).parentNode.offsetWidth * 0.618;
      });

      return {
        defaultHeight,
        handleClick,
        ...useDerivedProp(),
        ...useInitApi(props, context)
      };
    }
  });
</script>
