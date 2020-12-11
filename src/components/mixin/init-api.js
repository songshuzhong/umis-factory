import qs from 'qs';
import deepEqual from 'deep-equal';
import clonedeep from 'lodash.clonedeep';

export default {
  props: {
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
    syncLocation: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      iLoading: false,
      iStopAutoRefresh: false,
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
    data: {
      handler() {
        if (this.isMounted && this.initApi) {
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
    this.compiledCacheUrl = '';
    this.compiledCacheParams = {};
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
    handleFetchApi(apiData, feedback) {
      if (this.iSendOn === false) {
        return;
      }
      const { method, url, params } = apiData || this.initApi;
      let compiledParams = params;
      let compiledUrl;
      let mergedData;
      let fetchBody;

      if (this.syncLocation) {
        mergedData = this.useSyncLocation(this.data);
      }

      if (params) {
        compiledParams = this.$getCompiledParams(params, mergedData);
        this.compiledCacheParams = clonedeep(compiledParams);
      }

      compiledUrl = this.$getCompiledUrl(url, mergedData);
      this.compiledCacheUrl = compiledUrl;

      if (this.usePageInfo) {
        compiledParams = this.usePageInfo(compiledParams);
      }
      if (method === 'get') {
        fetchBody = {
          params: compiledParams,
        };
      } else {
        fetchBody = compiledParams;
      }

      this.iLoading = true;
      if (this.useSyncHistory) {
        this.useSyncHistory({
          pageIndex: this.iPageIndex,
          pageSize: this.iPageSize,
        });
      }

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
              message: res.msg,
              showClose: true,
              type: 'success',
            });
        })
        .catch(error => {
          this.$message({
            message: error.msg,
            showClose: true,
            type: 'error',
          });
        })
        .finally(() => {
          this.iLoading = false;
          feedback && feedback();
        });
    },
    shouldUpdateInitApi() {
      const { url, params } = this.initApi;
      const compiledUrl = this.$getCompiledUrl(url, this.data);
      const compiledParams = this.$getCompiledParams(params, this.data);

      if (
        compiledUrl !== this.compiledCacheUrl ||
        !deepEqual(compiledParams, this.compiledCacheParams)
      ) {
        console.log(compiledParams, this.compiledCacheParams);
        this.handleFetchApi();
      }
    },
    useSyncLocation(mergedData) {
      const defaultQuery = qs.parse(window.location.search.substr(1));
      return Object.assign({}, mergedData, defaultQuery);
    },
    useCompiledParams() {},
    useCompiledUrl() {},
  },
};
