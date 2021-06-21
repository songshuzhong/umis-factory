import { onMounted, onBeforeUnmount, computed, watch, reactive, ref, getCurrentInstance } from 'vue';
import deepEqual from 'deep-equal';
import clonedeep from 'lodash.clonedeep';
import { constructUrl, getUrlParams } from '../../utils/url';

export default function (props) {
  const { proxy } = getCurrentInstance();
  const isMounted = ref(false);
  const iPageIndex = ref(1);
  const iPageSize = ref(10);
  let iLoading = ref(false);
  let iTotal = ref();
  let iHasMore = ref(true);
  let data = reactive({});
  let rows = ref([]);
  let initData = ref(props.initData);
  let initRows = reactive(props.initRows);
  let interval = reactive(props.interval);
  let iStopAutoRefresh = reactive(props.iStopAutoRefresh);
  let intervalFetcher = null;
  let compiledCacheUrl = null;
  let compiledCacheParams = null;
  let cacheData = null;
  const iApiLoading = computed(() => {
    return !props.silentLoading && props.iLoading;
  });
  const iSendOn = computed(() => {
    if (props.sendOn) {
      return proxy.$onExpressionEval(props.sendOn, data);
    }
    return true;
  });

  const clearAutoRefresh = () => {
    if (props.interval && intervalFetcher) {
      clearInterval(intervalFetcher);
    }
  };
  const handleIntervalFetch = () => {
    intervalFetcher = setInterval(() => {
      handleFetchApi();
      if (props.stopAutoRefreshWhen) {
        props.iStopAutoRefresh = proxy.$onExpressionEval(
          props.stopAutoRefreshWhen,
          proxy
        );
      }
    }, props.interval);
  };
  const handleFetchApi = (apiData, feedback) => {
    if (props.iSendOn === false) {
      return;
    }
    const { method, url, params } = apiData || props.initApi;
    let mergedData = data;
    let compiledParams = params;
    let compiledUrl = url;
    let fetchBody;

    mergedData = useMergeUrlParams(mergedData);
    compiledParams = useCompiledParams(params, mergedData);
    compiledUrl = useCompiledUrl(url, mergedData);

    if (params === '&') {
      compiledParams = mergedData
    }
    if (proxy.$.usePageInfo) {
      compiledParams = usePageInfo(compiledParams);
    }
    if (method === 'get') {
      fetchBody = {
        params: compiledParams,
      };
    } else {
      fetchBody = compiledParams;
    }
    fetchBody = proxy.$json2FormData(proxy.$umisConfig.isFormData, fetchBody);
    iLoading.value = true;
    return proxy.$api
      .slientApi(proxy.$umisConfig)
      [method](compiledUrl, fetchBody)
      .then(res => {
        const result = res.data;
        if (result) {
          if (result.hasOwnProperty('rows')) {
            iTotal.value = result.count;
            iHasMore.value = result.hasMore;
            rows.value = result.rows;
          } else {
            if (data) {
              Object.assign(data, result);
            } else {
              data = result;
            }
          }
        }
        !props.silentMessage &&
        proxy.$message({
          message: res.msg,
          showClose: true,
          type: 'success',
        });
        feedback && feedback(data);
        return res;
      })
      .catch(error => {
        proxy.$message({
          message: error.msg,
          showClose: true,
          type: 'error',
        });
        return error;
      })
      .finally(() => {
        iLoading.value = false;
      });
  };
  const shouldUpdateInitApi = (val) =>  {
    let mergedData = val;
    const { url, params } = props.initApi;
    if (props.syncLocation) {
      mergedData = useMergeUrlParams(mergedData);
    }
    const compiledUrl = proxy.$getCompiledUrl(url, mergedData);
    const compiledParams = proxy.$getCompiledParams(params, mergedData);

    if (
      (params === '&' && !deepEqual(cacheData, val)) ||
      (/\$\{.+?\}/g.test(url) && !compiledCacheUrl && compiledUrl) ||
      (compiledCacheUrl && compiledCacheUrl !== compiledUrl) ||
      (compiledCacheParams && !deepEqual(compiledParams, compiledCacheParams))
    ) {
      cacheData = val;
      handleFetchApi();
    }
  };
  const useMergeUrlParams = (mergedData) => {
    if (props.syncLocation) {
      const defaultQuery = getUrlParams();
      return Object.assign({}, mergedData, defaultQuery);
    }
    return mergedData;
  };
  const useCompiledParams = (params, mergedData) => {
    let shouldCompiled = false;
    for (const key in params) {
      if (params.hasOwnProperty(key) && /^\$\{.+?\}/g.test(params[key])) {
        shouldCompiled = true;
      }
    }
    if (shouldCompiled) {
      const compiledParams = proxy.$getCompiledParams(params, mergedData);
      compiledCacheParams = clonedeep(compiledParams);
      return compiledParams;
    }
    return params;
  };
  const useCompiledUrl = (url, mergedData) => {
    if (/\$\{.+?\}/g.test(url)) {
      const compiledUrl = proxy.$getCompiledUrl(url, mergedData);
      compiledCacheUrl = compiledUrl;
      return compiledUrl;
    }
    return url;
  };
  const onPageIndexChanged = (pageIndex) => {
    const apiData = props.initApi;
    iPageIndex.value = pageIndex;
    apiData.params.pageIndex = pageIndex;
    handleFetchApi(apiData);
  };
  const onPageSizeChanged = (pageSize) => {
    const apiData = props.initApi;
    iPageIndex.value = 1;
    iPageSize.value = pageSize;
    apiData.params.pageIndex = 1;
    apiData.params.pageIndex = pageSize;
    handleFetchApi(apiData);
  };
  const usePageInfo = (params = {}) => {
    params['pageIndex'] = iPageIndex;
    params['pageSize'] = iPageSize;
    syncPageHistory();
    return params;
  };
  const syncPageHistory = () => {
    const defaultQuery = getUrlParams();
    defaultQuery['pageIndex'] = iPageIndex;
    defaultQuery['pageSize'] = iPageSize;
    const newUrl = constructUrl(
        '',
        location.pathname,
        defaultQuery,
        location.hash,
        location.protocol
    );
    window.history.replaceState({}, window.document.title, newUrl);
  };

  onBeforeUnmount(() => {
    const defaultQuery = getUrlParams();
    const { pageIndex, pageSize } = defaultQuery;
    const defaultPageIndex = pageIndex || iPageIndex;
    const defaultPageSize = pageSize || iPageSize;
    iPageIndex.value = defaultPageIndex;
    iPageSize.value = defaultPageSize;
  });

  watch(initRows, val => {
    if (!props.initApi.url && props.inherit) {
      rows.value = val;
    }
  });
  watch(initData, (val, old) => {
    let mergeData = {};
    if (props.inherit.type !== 'none') {
      if (props.inherit.type === 'all') {
        mergeData = Object.assign({}, data, val);
      } else if (props.inherit.type === 'include') {
        props.inherit.value.forEach(key => {
          if (val.hasOwnProperty(key)) {
            mergeData[key] = clonedeep(val[key]);
          }
        });
        mergeData = Object.assign({}, data, mergeData);
      } else if (props.inherit.type === 'exclude') {
        for (let key in val) {
          if (val.hasOwnProperty(key) && !props.inherit.value.includes(key)) {
            mergeData[key] = clonedeep(val[key]);
          }
        }
      }
    }
    data = mergeData;
  }, {
    immediate: true,
    deep: true
  });
  watch(interval, (val, old) => {
    if (val !== old && !old) {
      clearInterval(intervalFetcher);
    }
    if (val) {
      handleIntervalFetch();
    }
  });
  watch(iStopAutoRefresh, (val, old) => {
    if (val) {
      clearAutoRefresh();
    }
  });
  watch(data, (val, old) => {
    if (isMounted && props.initApi) {
      shouldUpdateInitApi(val, old);
    }
  });

  onMounted(() => {
    isMounted.value = true;
    intervalFetcher = null;
    compiledCacheUrl = null;
    compiledCacheParams = null;
    cacheData = null;
    if (props.interval) {
      handleIntervalFetch();
    } else if (props.initApi) {
      handleFetchApi();
    }
  });
  onBeforeUnmount(() => {
    clearAutoRefresh();
  });

  return {
    onPageIndexChanged,
    onPageSizeChanged,
    isMounted,
    iLoading,
    iPageIndex,
    iPageSize,
    data,
    rows,
    iTotal,
    iHasMore,
    iApiLoading,
    iSendOn
  };
}
