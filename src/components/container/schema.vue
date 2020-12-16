<template>
  <div v-loading="iSchemaLoading">
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
    <template v-if="canSchemaUpdate">
      <template v-for="path in portalList">
        <component
          v-bind="portalMap[path].body"
          :path="path"
          :visible="portalMap[path].visible"
          :is="portalMap[path].actionType"
          :init-data="portalMap[path].data"
          :on-popup-invisible="handleInVisiable"
        />
      </template>
    </template>
  </div>
</template>
<script>
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
      default: true,
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
      portalList: [],
      portalMap: {},
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
  mounted() {
    this.isMounted = true;
    this.$eventHub.$on('mis-schema:change', this.updatePageSchema);
    this.$eventHub.$on('mis-portal:create', this.createProtal);
    this.$eventHub.$on('mis-portal:destroy', this.destroyProtal);
    if (this.initSchema) {
      this.getPageSchema();
    }
  },
  methods: {
    createProtal(path, popupProps) {
      this.portalMap[path] = popupProps;
      this.portalList = [...this.portalList, path];
    },
    destroyProtal(path) {
      this.portalList = this.portalList.filter(item => item !== path);
      delete this.portalMap[path];
    },
    handleInVisiable(path) {
      this.portalList = this.portalList.filter(item => item !== path);
      delete this.portalMap[path];
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
        .slientApi()
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
