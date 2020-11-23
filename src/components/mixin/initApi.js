import deepEqual from 'deep-equal';

export default {
  props: {
    iSchemaUpdate: {
      type: Boolean,
      required: false,
      default: true,
    },
    initSchema: {
      type: Object,
      required: false,
    },
    initApi: {
      type: Object,
      required: false,
    },
    interval: {
      type: Number,
      required: false,
      default: 0,
    },
    sendOn: {
      type: String,
      required: false,
    },
    stopAutoRefreshWhen: {
      type: String,
      required: false,
    },
    silentLoading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      iTotal: 0,
      iPageIndex: 1,
      iPageSize: 10,
      iHasMore: true,
      iLoading: false,
      iSchemaLoading: false,
      iStopAutoRefresh: false,
      iSchema: {},
      data: {},
      rows: [],
    };
  },
  watch: {
    interval: {
      handler(val, old) {
        if (val !== old && !old) {
          clearInterval(this.intervalFetcher);
        }
        if (val) {
          this.handleIntervalFetch();
        }
      },
    },
    iStopAutoRefresh: {
      handler(val) {
        if (val) {
          this.clearAutoRefresh();
        }
      },
    },
    'initSchema.url': {
      handler() {
        this.getPageSchema();
      },
      deep: true,
    },
    data: {
      handler(val, old) {
        if (this.isMounted && val !== old && this.initApi) {
          this.shouldUpdateInitApi();
        }
      },
    },
  },
  computed: {
    iApiLoading() {
      return !this.silentLoading && this.iLoading;
    },
  },
  mounted() {
    this.isMounted = true;
    this.intervalFetcher = null;
    this.compiledCacheUrl = null;
    this.compiledCacheParams = null;
    this.$eventHub.$on('mis-schema:change', this.updatePageSchema);
    if (this.initSchema) {
      this.getPageSchema();
    }
    if (this.initApi) {
      this.handleFetchApi();

      if (this.interval) {
        this.handleIntervalFetch();
      }
    }
  },
  beforeDestroy() {
    this.clearAutoRefresh();
  },
  methods: {
    clearAutoRefresh() {
      if (this.interval && this.intervalFetcher) {
        clearInterval(this.intervalFetcher);
      }
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
          this.iSchema = res.data;
          this.iSchemaLoading = false;
          window.UMIS = { schema: res.data };
          this.$eventHub.$emit('mis-schema:init', res.data);
        });
    },
    handleIntervalFetch() {
      this.intervalFetcher = setInterval(() => {
        this.handleFetchApi();
        if (this.stopAutoRefreshWhen) {
          this.iStopAutoRefresh = this.$onExpressionEval(
            this.stopAutoRefreshWhen,
            this
          );
        }
      }, this.interval);
    },
    handleFetchApi(apiData) {
      const { method, url, params } = apiData || this.initApi;
      const compiledUrl = this.$getCompiledUrl(url, this.data);
      const compiledParams = this.$getCompiledParams(params, this.data);
      let fetchBody;
      if (method === 'get') {
        fetchBody = {
          params: {
            pageIndex: this.iPageIndex,
            pageSize: this.iPageSize,
            ...compiledParams,
          },
        };
      } else {
        fetchBody = {
          pageIndex: this.iPageIndex,
          pageSize: this.iPageSize,
          ...compiledParams,
        };
      }
      this.iLoading = true;

      this.compiledCacheUrl = compiledUrl;
      this.compiledCacheParams = compiledParams;

      fetchBody = this.$json2FormData(this.$umisConfig.isFormData, fetchBody);

      this.$api
        .slientApi()
        [method](compiledUrl, fetchBody)
        .then(res => {
          const data = res.data;
          if (data.hasOwnProperty('rows')) {
            const { total, rows, hasMore } = data;
            this.iTotal = total;
            this.iHasMore = hasMore;
            this.rows = rows;
          } else {
            this.data = data;
          }
        })
        .finally(() => {
          this.iLoading = false;
        });
    },
    updatePageSchema(data) {
      if (this.iSchemaUpdate) {
        this.iSchema = data;
        window.UMIS = { schema: data };
      }
    },
    handlePageChanged(pageIndex) {
      this.iPageIndex = pageIndex;
      this.handleFetchApi();
    },
    shouldUpdateInitApi() {
      const { url, params } = this.initApi;
      const compiledUrl = this.$getCompiledUrl(url, this.data);
      const compiledParams = this.$getCompiledParams(params, this.data);

      if (
        compiledUrl !== this.compiledCacheUrl ||
        !deepEqual(compiledParams, this.compiledCacheParams)
      ) {
        this.handleFetchApi();
      }
    },
  },
};
