import deepEqual from 'deep-equal';

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
    silentMessage: {
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
        if (
          this.isMounted &&
          val !== old &&
          this.initApi &&
          !['mis-component', 'mis-service'].includes(
            this.$options['_componentTag']
          )
        ) {
          this.shouldUpdateInitApi();
        }
      },
    },
  },
  computed: {
    iApiLoading() {
      return !this.silentLoading && this.iLoading;
    },
    iSendOn() {
      if (this.sendOn) {
        return this.$onExpressionEval(this.sendOn, this.data);
      }
      return true;
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
    if (this.initApi && this.$options['_componentTag'] !== 'mis-component') {
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
          const { pageSchema, ...pageInfo } = res.data;
          const schema = JSON.parse(pageSchema);
          this.iSchema = schema;
          this.iPageInfo = pageInfo;
          this.iSchemaLoading = false;
          window.UMIS = { pageInfo, pageSchema: schema };
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
      if (this.iSendOn === false) {
        return;
      }
      const { method, url, params } = apiData || this.initApi;
      const compiledUrl = this.$getCompiledUrl(url, this.data);
      let compiledParams = params;
      let fetchBody;

      if (params) {
        compiledParams = this.$getCompiledParams(params, this.data);
      }

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

      return this.$api
        .slientApi()
        [method](compiledUrl, fetchBody)
        .then(res => {
          const data = res.data;
          if (data && data.hasOwnProperty('rows')) {
            const { count, rows, hasMore } = data;
            this.iTotal = count;
            this.iHasMore = hasMore;
            this.rows = rows;
          } else {
            this.data = data;
          }
          !this.silentMessage &&
            this.$message({
              message: res.message,
              showClose: true,
              type: 'success',
            });
        })
        .catch(error => {
          this.$message({
            message: error.message,
            showClose: true,
            type: 'error',
          });
        })
        .finally(() => {
          this.iLoading = false;
        });
    },
    updatePageSchema(schema) {
      if (this.canSchemaUpdate) {
        this.iSchema = schema;
        window.UMIS.pageSchema = schema;
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
