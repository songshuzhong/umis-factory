const config = {
  isFormData: false,
  isApiChanged: false,
  domains: {},
  style: '',
  script: '',
};

const overwrite = options => {
  config.isFormData = options.isFormData || false;
  config.isApiChanged = options.isApiChanged || false;
  config.domains = options.domains || {};
  config.style = options.style || '';
  config.script = options.script || '';

  return config;
};

export { config, overwrite };
