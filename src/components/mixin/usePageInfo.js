import { getCurrentInstance, onBeforeUnmount, ref } from 'vue';
import { getUrlParams, constructUrl } from '../../utils/url';

export default function (props, proxy) {
  const iTotal = ref(0);
  const iPageIndex = ref(1);
  const iPageSize = ref(10);
  const iHasMore = ref(true);

  onBeforeUnmount(() => {
    const defaultQuery = getUrlParams();
    const { pageIndex, pageSize } = defaultQuery;
    const defaultPageIndex = pageIndex || iPageIndex;
    const defaultPageSize = pageSize || iPageSize;
    iPageIndex.value = defaultPageIndex;
    iPageSize.value = defaultPageSize;
  });
  const handlePageChanged = (pageIndex) => {
    iPageIndex.value = pageIndex;
    proxy.handleFetchApi();
  };
  const handlePageSizeChanged = (pageSize) => {
    iPageIndex.value = 1;
    iPageSize.value = pageSize;
    proxy.handleFetchApi();
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

  return {
    handlePageChanged,
    handlePageSizeChanged,
    usePageInfo,
    syncPageHistory,
    iTotal,
    iPageIndex,
    iPageSize,
    iHasMore
  }
};
