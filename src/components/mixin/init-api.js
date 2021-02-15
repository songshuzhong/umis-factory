import deepEqual from 'deep-equal';
import clonedeep from 'lodash.clonedeep';
import { getUrlParams } from '../../utils/url';

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
      handler(val, oldVal) {
        if (this.isMounted && this.initApi) {
          this.shouldUpdateInitApi(val, oldVal);
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
    this.cacheData = null;
    if (this.initApi) {
      this.handleFetchApi();
      if (this.interval) {
        this.handleIntervalFetch();
      }
    }
  },
  beforeUnmount() {
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
      let mergedData = this.data;
      let compiledParams = params;
      let compiledUrl = url;
      let fetchBody;

      mergedData = this.useMergeUrlParams(mergedData);
      compiledParams = this.useCompiledParams(params, mergedData);
      compiledUrl = this.useCompiledUrl(url, mergedData);

      if (params === '&') {
        compiledParams = mergedData
      }
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
      fetchBody = this.$json2FormData(this.$umisConfig.isFormData, fetchBody);
      this.iLoading = true;
      return this.$api
        .slientApi(this.$umisConfig)
        [method](compiledUrl, fetchBody)
        .then(res => {
          const data = res.data;
          if (data) {
            if (data.hasOwnProperty('rows')) {
              const { count, rows, hasMore } = data;
              this.iTotal = count;
              this.iHasMore = hasMore;
              this.rows = rows;
            } else {
              if (this.data) {
                Object.assign(this.data, data);
              } else {
                this.data = data;
              }
            }
          }
          !this.silentMessage &&
            this.$message({
              message: res.msg,
              showClose: true,
              type: 'success',
            });
          feedback && feedback(data);
          return res;
        })
        .catch(error => {
          this.$message({
            message: error.msg,
            showClose: true,
            type: 'error',
          });
          return error;
        })
        .finally(() => {
          this.iLoading = false;
        });
    },
    shouldUpdateInitApi(val) {
      let mergedData = val;
      const { url, params } = this.initApi;
      if (this.syncLocation) {
        mergedData = this.useMergeUrlParams(mergedData);
      }
      const compiledUrl = this.$getCompiledUrl(url, mergedData);
      const compiledParams = this.$getCompiledParams(params, mergedData);

      if (
        (params === '&' && !deepEqual(this.cacheData, val)) ||
        (/\$\{.+?\}/g.test(url) && !this.compiledCacheUrl && compiledUrl) ||
        (this.compiledCacheUrl && this.compiledCacheUrl !== compiledUrl) ||
        (this.compiledCacheParams && !deepEqual(compiledParams, this.compiledCacheParams))
      ) {
        this.cacheData = val;
        this.handleFetchApi();
      }
    },
    useMergeUrlParams(mergedData) {
      if (this.syncLocation) {
        const defaultQuery = getUrlParams();
        return Object.assign({}, mergedData, defaultQuery);
      }
      return mergedData;
    },
    useCompiledParams(params, mergedData) {
      let shouldCompiled = false;
      for (const key in params) {
        if (params.hasOwnProperty(key) && /^\$\{.+?\}/g.test(params[key])) {
          shouldCompiled = true;
        }
      }
      if (shouldCompiled) {
        const compiledParams = this.$getCompiledParams(params, mergedData);
        this.compiledCacheParams = clonedeep(compiledParams);
        return compiledParams;
      }
      return params;
    },
    useCompiledUrl(url, mergedData) {
      if (/\$\{.+?\}/g.test(url)) {
        const compiledUrl = this.$getCompiledUrl(url, mergedData);
        this.compiledCacheUrl = compiledUrl;
        return compiledUrl;
      }
      return url;
    },
  },
};
