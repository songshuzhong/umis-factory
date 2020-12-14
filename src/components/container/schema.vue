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
    if (this.initSchema) {
      this.getPageSchema();
    }
  },
  methods: {
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
