import {Loading as ElLoading} from 'element-ui';
import {Notification} from 'element-ui';
import message from 'element-ui';

import UmisConfig from './utils/config';
import api from './utils/api';
import {
  getRenderedTpl,
  getCompiledUrl,
  getCompiledParams,
  onExpressionEval,
  json2FormData,
  saveInitStyle,
  saveInitFormType,
} from './utils/tools';

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);

export default {
  install(Vue, options) {
    const misComponents = [];

    requireComponent.keys().forEach(filePath => {
      const componentConfig = requireComponent(filePath);
      let componentName = filePath.replace(/(.*\/)*([^.]+).*/gi, '$2');
      misComponents.push(`mis-${componentName}`);
      componentName = componentName
        .split('-')
        .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
        .join('');

      Vue.component(
        `Mis${componentName}`,
        componentConfig.default || componentConfig
      );
    });
    Vue.use(ElLoading);
    Vue.prototype.$misConfig = UmisConfig.create(options);
    Vue.prototype.$eventHub = new Vue();
    Vue.prototype.$misComponents = misComponents;
    Vue.prototype.$onExpressionEval = onExpressionEval;
    Vue.prototype.$getRenderedTpl = getRenderedTpl;
    Vue.prototype.$getCompiledUrl = getCompiledUrl;
    Vue.prototype.$getCompiledParams = getCompiledParams;
    Vue.prototype.$json2FormData = json2FormData;
    Vue.prototype.$saveInitStyle = saveInitStyle;
    Vue.prototype.$saveInitFormType = saveInitFormType;
    Vue.prototype.$notice = Notification;
    Vue.prototype.$message = message;
    Vue.prototype.$api = api(options);
  },
};
