<template>
  <div v-loading="iSchemaLoading" class="umis-schema__container">
    <template
      v-if="Object.prototype.toString.call(iSchema) === '[object Array]'"
    >
      <component
        v-for="(item, index) in iSchema"
        v-bind="item"
        :is="item.renderer"
        :key="`${path}/${index}/${item.renderer}`"
        :path="`${path}/${index}/${item.renderer}`"
      />
    </template>
    <template
      v-if="Object.prototype.toString.call(iSchema) === '[object Object]'"
    >
      <component
        v-if="!iSchemaLoading"
        v-bind="iSchema"
        :is="iSchema.renderer"
        :key="`${path}/${iSchema.renderer}`"
        :path="`${path}/${iSchema.renderer}`"
      />
    </template>
    <div v-if="canSchemaUpdate">
      <template v-for="({ actionType, body, data, visible }, path) in popMap" :key="path">
        <component
          v-bind="body"
          :path="path"
          :is="actionType"
          :visible="visible"
          :init-data="data"
          :on-popup-invisible="destroyProtal"
        />
      </template>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash.clonedeep';
import derivedProp from '../mixin/derived-prop';

export default {
  name: 'MisSchema',
  props: {
    schema: {
      type: [Array, Object],
      required: false,
    },
    canSchemaUpdate: {
      type: Boolean,
      required: false,
      default: false,
    },
    initSchema: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      iSchemaLoading: false,
      iStopAutoRefresh: false,
      iSchema: {},
      popMap: {},
    };
  },
  watch: {
    schema: {
      handler(val) {
        this.iSchema = val;
      },
      immediate: true,
    },
    'initSchema.url': {
      handler() {
        this.getPageSchema();
      },
      deep: true,
    },
  },
  computed: {
    path() {
      return this.canSchemaUpdate ? this.$route.path : '/website';
    },
  },
  mixins: [derivedProp],
  mounted() {
    this.isMounted = true;
    this.$eventHub.$on('mis-schema:change', this.updatePageSchema);
    this.$eventHub.$on('mis-portal:create', this.createProtal);
    this.$eventHub.$on('mis-portal:destroy', this.destroyProtal);
    if (this.initSchema) {
      this.getPageSchema();
    }
    if (this.canSchemaUpdate) {
      this.$initSetting(this, this.$umisConfig);
    }
  },
  methods: {
    createProtal(path, pop) {
      const popMap = this.popMap;
      popMap[path] = pop;
      this.popMap = clonedeep(popMap);
    },
    destroyProtal(path) {
      const popMap = this.popMap;
      delete popMap[path];
      // popMap[path].visible = false
      this.popMap = clonedeep(popMap);
    },
    getPageSchema() {
      const { method, url, params = {} } = this.initSchema;
      let fetchBody = params;

      if (method === 'get') {
        fetchBody = {
          params,
        };
      }

      this.iSchemaLoading = true;
      this.$api
        .slientApi(this.$umisConfig)
        [method](url, fetchBody)
        .then(res => {
          const { pageSchema, ...pageInfo } = res.data;
          const schema = JSON.parse(pageSchema);
          this.iSchema = schema;
          this.iSchemaLoading = false;
          window.UMIS = { pageInfo, pageSchema: schema };
        });
    },
    updatePageSchema(schema) {
      if (this.canSchemaUpdate) {
        this.iSchemaLoading = true;
        const timer = setTimeout(() => {
          this.iSchema = schema;
          this.iSchemaLoading = false;
          window.UMIS.pageSchema = schema;
          clearTimeout(timer);
        }, 200);
      }
    },
  },
};
</script>
