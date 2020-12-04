export default {
  props: {
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
    'initSchema.url': {
      handler() {
        this.getPageSchema();
      },
      deep: true,
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
          this.iPageInfo = pageInfo;
          this.iSchemaLoading = false;
          window.UMIS = { pageInfo, pageSchema: schema };
        });
    },
    updatePageSchema(schema) {
      if (this.canSchemaUpdate) {
        this.iSchema = schema;
        window.UMIS.pageSchema = schema;
      }
    },
  },
};
