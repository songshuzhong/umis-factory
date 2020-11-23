let instance = null;
let isFormData = false;
let isApiChanged = false;
let domains = [];
let style = '';
let script = '';

export default {
  create(options) {
    instance = null;
    isFormData = options.isFormData || false;
    isApiChanged = options.isApiChanged || false;
    domains = options.domains || [];
    style = options.style || '';
    script = options.script || '';
  },
  getFormDataType() {
    return isFormData;
  },
  setFormDataType(val) {
    isFormData = val;
  },
  getStyle() {
    return style;
  },
  setStyle(val) {
    style = val;
  },
  getScript() {
    return script;
  },
  setScript(val) {
    script = val;
  },
};
