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
import initData from './mixin/init-data';
import derivedProp from './mixin/derived-prop';

export default {
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
  computed: {
    eachData() {
      if (this.type === 'list') {
        return this.rows;
      }
      return this.data;
    }
  },
  mixins: [initData, derivedProp],
};
</script>
