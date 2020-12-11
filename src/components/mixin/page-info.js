import qs from 'qs';

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
    const defaultQuery = qs.parse(window.location.search.substr(1));
    const defaultPageIndex = defaultQuery.pageIndex || this.iPageIndex;
    const defaultPageSize = defaultQuery.pageSize || this.iPageSize;
    this.iPageIndex = defaultPageIndex;
    this.iPageSize = defaultPageSize;
    this.useSyncHistory({
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    });
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
      return params;
    },
  },
};
