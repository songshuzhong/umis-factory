const config = {
  isFormData: false,
  isApiChanged: false,
  domains: [],
  style: '',
  script: '',
};
export default {
  create(options) {
    config.isFormData = options.isFormData || false;
    config.isApiChanged = options.isApiChanged || false;
    config.domains = options.domains || [];
    config.style = options.style || '';
    config.script = options.script || '';

    return config;
  },
};
