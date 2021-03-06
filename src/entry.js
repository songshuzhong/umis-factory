import { Loading, Notification, Message } from 'element-ui';
import resize from 'vue-element-resize-detector';

import MisSchema from './components/container/schema';
import MisSetting from './components/setting/index';
import { overwrite } from './utils/config';
import api from './utils/api';
import {
  getRenderedTpl,
  getCompiledUrl,
  getCompiledParams,
  onExpressionEval,
  json2FormData,
  saveInitStyle,
  saveInitFormType,
  saveAdaptor,
} from './utils/tools';

import './assets/styles/index.scss';

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
    Vue.use(Loading);
    Vue.use(resize);
    Vue.prototype.$eventHub = new Vue();
    Vue.prototype.$misComponents = misComponents;
    Vue.prototype.$umisConfig = overwrite(options);
    Vue.prototype.$onExpressionEval = onExpressionEval;
    Vue.prototype.$getRenderedTpl = getRenderedTpl;
    Vue.prototype.$getCompiledUrl = getCompiledUrl;
    Vue.prototype.$getCompiledParams = getCompiledParams;
    Vue.prototype.$json2FormData = json2FormData;
    Vue.prototype.$saveInitStyle = saveInitStyle;
    Vue.prototype.$saveInitFormType = saveInitFormType;
    Vue.prototype.$saveAdaptor = saveAdaptor;
    Vue.prototype.$notice = Notification;
    Vue.prototype.$message = Message;
    Vue.prototype.$api = api(options);
  },
};

export { MisSchema, MisSetting };
