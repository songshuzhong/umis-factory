import qs from 'qs';

export default {
  methods: {
    appendQueryInfo(params) {
      const defaultQuery = qs.parse(window.location.search.substr(1));
      Object.assign(params, defaultQuery);
    },
    useSyncHistory(params) {
      const paramsToUrl = qs.stringify(params);
      let newUrl = window.location.pathname;
      if (newUrl.includes('?')) {
        newUrl += paramsToUrl;
      } else {
        newUrl += `?${paramsToUrl}`;
      }
      window.history.replaceState({}, window.document.title, newUrl);
    },
  },
};
