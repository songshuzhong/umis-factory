import template from 'lodash.template';

const getRenderedTpl = (tpl, data = {}) => {
  const compiled = template(tpl);
  const html = compiled({ data });

  return html;
};

const getCompiledUrl = (tpl, data) => {
  if (data === null || typeof data === 'undefined') {
    data = {};
  }

  const temporaryTpl = tpl.replace(
    /\${([^}{]+?)}/gi,
    (escape, name) => data[name] || ''
  );

  return temporaryTpl;
};

const getCompiledParams = (params, data = {}) => {
  let compiledParams = {};

  if (params) {
    const compiled = template(JSON.stringify(params));
    compiledParams = JSON.parse(compiled(data));
  }

  return compiledParams;
};

const onExpressionEval = (expression, data) => {
  const fn = new Function('data', `with(data) { return !!(${expression}) }`);
  try {
    return fn.call(data, data);
  } catch (e) {
    return false;
  }
};

const json2FormData = (isFormData, data) => {
  let formData;
  if (isFormData) {
    formData = new FormData();
    for (let name in data) {
      if (data.hasOwnProperty(name)) formData.append(name, data[name]);
    }
  } else {
    formData = {};
    for (let name in data) {
      if (data.hasOwnProperty(name)) formData[name] = data[name];
    }
  }
  return formData;
};

const saveInitFormType = (ctx, isFormData) => {
  ctx.$umisConfig.isFormData = isFormData;
};

const saveAdaptor = (ctx, script) => {
  return new Promise((resolve, reject) => {
    ctx.$umisConfig.adaptor = script;
    ctx.$umisConfig.isAdaptorChanged = true;
    resolve();
  });
};

const saveInitStyle = (ctx, style) => {
  return new Promise((resolve, reject) => {
    try {
      let ele = document.getElementById('umis-setting__style');

      if (!ele) {
        ele = document.createElement('style');
        ele.id = 'umis-setting__style';
        document.head.appendChild(ele);
      }
      ele.innerHTML = style;
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export {
  getRenderedTpl,
  getCompiledUrl,
  getCompiledParams,
  onExpressionEval,
  json2FormData,
  saveInitStyle,
  saveInitFormType,
  saveAdaptor,
};
