import axios from 'axios';
import { config } from './config';
const isCancel = axios.isCancel;
const cancelToken = axios.CancelToken;
let adaptorFunction;
let umisApi = null;

function successInterceptor(response) {
  if (
    response &&
    response.data &&
    (response.data.status === 10000 ||
      response.data.status === 1000 ||
      response.data.status === 200 ||
      response.data.status === 0)
  ) {
    const {
      data,
      config: { url, method, params },
    } = response;
    if (!adaptorFunction) {
      adaptorFunction = new Function(
        'api',
        'method',
        'params',
        'res',
        config.adaptor
      );
    }
    if (data.data) {
      adaptorFunction(url, method, params, data);
    }
    return data;
  }
  return Promise.reject(response);
}

function errorInterceptor(error) {
  return Promise.reject(error);
}

function factory(baseUrl, configs) {
  const mergedConfigs = Object.assign({}, configs || {});
  if (baseUrl) {
    mergedConfigs.baseURL = baseUrl;
  }
  if (!mergedConfigs.params) {
    mergedConfigs.params = {};
  }
  const instance = axios.create(mergedConfigs);

  instance.interceptors.request.use(
    config => {
      if (!config.params) {
        config.params = {};
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    response => {
      return successInterceptor(response);
    },
    error => {
      return errorInterceptor(error);
    }
  );
  return instance;
}

function apiFactory() {
  config.domains['VUE_APP_API_BASE'] = process.env.VUE_APP_API_BASE;

  return {
    isCancel,
    cancelToken,
    factory: factory,
    slientApi(config = {}) {
      if (config.isApiChanged || config.isAdaptorChanged || !umisApi) {
        config.isApiChanged = false;
        config.isAdaptorChanged = false;
        adaptorFunction = '';
        umisApi = factory(
          config.domains['VUE_APP_API_ACTIVE'],
          {
            withCredentials: true,
          },
          true
        );
      }
      return umisApi;
    },
  };
}

export default apiFactory;
