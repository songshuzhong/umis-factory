import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { beforeUpdate } from './utils/resize';

import Eventhub from './utils/eventhub';
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
  initSetting
} from './utils/tools';

import './assets/styles/index.scss';

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);

export default {
  install(app, options) {
    const misNames = [];

    requireComponent.keys().forEach(filePath => {
      const componentConfig = requireComponent(filePath);
      let componentName = filePath.replace(/(.*\/)*([^.]+).*/gi, '$2');
      misNames.push(`mis-${componentName}`);
      componentName = componentName
        .split('-')
        .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
        .join('');
      app.component(
        `Mis${componentName}`,
        componentConfig.default || componentConfig
      );
    });

    app.use(ElLoading);
    app.directive('resize', beforeUpdate);
    app.config.globalProperties.$eventHub = new Eventhub();
    app.config.globalProperties.$misComponents = misNames;
    app.config.globalProperties.$umisConfig = overwrite(options);
    app.config.globalProperties.$onExpressionEval = onExpressionEval;
    app.config.globalProperties.$getRenderedTpl = getRenderedTpl;
    app.config.globalProperties.$getCompiledUrl = getCompiledUrl;
    app.config.globalProperties.$getCompiledParams = getCompiledParams;
    app.config.globalProperties.$json2FormData = json2FormData;
    app.config.globalProperties.$saveInitStyle = saveInitStyle;
    app.config.globalProperties.$saveInitFormType = saveInitFormType;
    app.config.globalProperties.$saveAdaptor = saveAdaptor;
    app.config.globalProperties.$initSetting = initSetting;
    app.config.globalProperties.$notice = ElNotification;
    app.config.globalProperties.$message = ElMessage;
    app.config.globalProperties.$api = api(options);
  },
};

export { MisSchema, MisSetting };
