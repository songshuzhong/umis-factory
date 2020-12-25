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
  ctx.$notice({
    type: 'success',
    title: '通知',
    message: '提交内容类型修改成功',
  });
};

const saveAdaptor = (ctx, script) => {
  ctx.$umisConfig.adaptor = script;
  ctx.$umisConfig.isAdaptorChanged = true;
  ctx.$notice({
    type: 'success',
    title: '通知',
    message: '接口适配器修改成功',
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
      ctx.$notice({
        type: 'success',
        title: '通知',
        message: '保存成功',
      });
      resolve();
    } catch (e) {
      ctx.$notice({
        type: 'error',
        title: '警告',
        message: e.toString(),
      });
      reject();
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
