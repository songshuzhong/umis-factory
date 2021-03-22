<template>
  <div class="umis-each__container">
    <template v-for="(item, index) in eachData" :key="`${path}/${index}/${body.renderer}`">
      <mis-component
        v-bind="getFattingProps(body)"
        :mis-name="body.renderer"
        :path="`${path}/${index}/${body.renderer}`"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :init-data="item"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import initApi from './mixin/props/init-api';
import useInitApi from './mixin/useInitApi';
import useDerivedProp from './mixin/useDerivedProp';

export default defineComponent({
  name: 'MisEach',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'map'
    },
    body: {
      type: Object,
      required: true,
    },
  },
  mixins: [initApi],
  setup(props) {
    const { data, rows } = useInitApi(props);
    const eachData = computed(() => {
      if (props.type === 'list') {
        return rows;
      }
      return data;
    });

    return {
      eachData,
      ...useDerivedProp()
    };
  }
});
</script>
