import { getUrlParams, constructUrl } from '../../utils/url';

export default {
  data() {
    return {
      iTotal: 0,
      iPageIndex: 1,
      iPageSize: 10,
      iHasMore: true,
    };
  },
  created() {
    const defaultQuery = getUrlParams();
    const { pageIndex, pageSize } = defaultQuery;
    const defaultPageIndex = pageIndex || this.iPageIndex;
    const defaultPageSize = pageSize || this.iPageSize;
    this.iPageIndex = defaultPageIndex;
    this.iPageSize = defaultPageSize;
  },
  methods: {
    handlePageChanged(pageIndex) {
      this.iPageIndex = pageIndex;
      this.handleFetchApi();
    },
    handlePageSizeChanged(pageSize) {
      this.iPageIndex = 1;
      this.iPageSize = pageSize;
      this.handleFetchApi();
    },
    usePageInfo(params = {}) {
      params['pageIndex'] = this.iPageIndex;
      params['pageSize'] = this.iPageSize;
      this.syncPageHistory();
      return params;
    },
    syncPageHistory() {
      const defaultQuery = getUrlParams();
      defaultQuery['pageIndex'] = this.iPageIndex;
      defaultQuery['pageSize'] = this.iPageSize;
      const newUrl = constructUrl(
        '',
        location.pathname,
        defaultQuery,
        location.hash,
        location.protocol
      );
      window.history.replaceState({}, window.document.title, newUrl);
    },
  },
};
