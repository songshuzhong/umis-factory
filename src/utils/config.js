const config = {
  isFormData: false,
  isApiChanged: false,
  isAdaptorChanged: false,
  domains: {},
  adaptor: '',
  style: '',
  script: '',
};

const overwrite = (options = {}) => {
  config.isFormData = options.isFormData || false;
  config.isApiChanged = options.isApiChanged || false;
  config.isInterceptChanged = options.isInterceptChanged || false;
  config.adaptor = options.adaptor || '';
  config.domains = options.domains
    ? { VUE_APP_API_ACTIVE: options.domains }
    : {
        VUE_APP_API_ACTIVE: process.env.VUE_APP_API_BASE,
      };
  config.style = options.style || '';
  config.script = options.script || '';

  return config;
};

export { config, overwrite };
