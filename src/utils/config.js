const config = {
  isFormData: false,
  isApiChanged: false,
  isAdaptorChanged: false,
  domains: {},
  adaptor: '',
  style: '',
  script: '',
};

const overwrite = options => {
  config.isFormData = options.isFormData || false;
  config.isApiChanged = options.isApiChanged || false;
  config.isInterceptChanged = options.isInterceptChanged || false;
  config.adaptor =
    options.adaptor ||
    `if(api.includes('/api/user')) {res.data.adaptor='这个是适配器补充字段';}`;
  config.domains = options.domains || {};
  config.style = options.style || '';
  config.script = options.script || '';

  return config;
};

export { config, overwrite };
