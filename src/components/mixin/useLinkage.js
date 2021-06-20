import { onMounted, getCurrentInstance } from 'vue';
import clonedeep from 'lodash.clonedeep';
import useInitApi from '../mixin/useInitApi';

export default function (props, contextData) {
  const { proxy } = getCurrentInstance();
  const { data } = useInitApi(props);
  const onLinkageTrigger = (target, exData) => {
    if (target) {
      proxy.$eventHub.$emit('mis-component:linkage', target, exData);
    }
  };

  const getURLParameters = (url) => {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, item) => {
      const [key, value] = item.split('=');
      total[key] = value.replace('${', '').replace('}', '');
      return total;
    }, {});
  };

  const handleLinkage = (linkage, exData) => {
    if (linkage) {
      const [target, url] = linkage.split('?');
      let newData = {};
      if (props && props.name && target.includes(props.name)) {
        if (url) {
          const fields = getURLParameters(url);
          for (const field in fields) {
            if (fields.hasOwnProperty(field)) {
              if (field === '*') {
                newData = exData;
              } else if (fields[field] === '*') {
                newData[field] = exData;
              } else {
                newData[field] = exData[fields[field]];
              }
            }
          }
          Object.assign(data, newData);
        } else {
          newData = Object.assign({}, proxy.data, exData);
          proxy.data = newData
        }
      }
      if (proxy.$.attrs.renderer === 'mis-aside') {
        console.log(111, proxy.data)
      }
    }
  };

  onMounted(() => {
    proxy.$eventHub.$on('mis-component:linkage', handleLinkage);
  });

  return {
    onLinkageTrigger,
    handleLinkage
  };
}
