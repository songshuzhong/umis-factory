import { onMounted, getCurrentInstance } from 'vue';
import clonedeep from 'lodash.clonedeep';

export default function (props) {
  const { ctx } = getCurrentInstance();
  const onLinkageTrigger = (target, data) => {
    if (target) {
      const trigerData = data || ctx.data;
      ctx.$eventHub.$emit('mis-component:linkage', target, trigerData);
    }
  };

  const getURLParameters = (url) => {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, item) => {
      const [key, value] = item.split('=');
      total[key] = value.replace('${', '').replace('}', '');
      return total;
    }, {});
  };

  const handleLinkage = (linkage, data) => {
    if (linkage) {
      const [target, url] = linkage.split('?');
      let newData = {};
      if (props && props.name && target.includes(props.name)) {
        if (url) {
          const fields = getURLParameters(url);
          for (const field in fields) {
            if (fields.hasOwnProperty(field)) {
              if (field === '*') {
                newData = data;
              } else if (fields[field] === '*') {
                newData[field] = data;
              } else {
                newData[field] = data[fields[field]];
              }
            }
          }
          newData = Object.assign(ctx.data, newData);
        } else {
          newData = Object.assign(ctx.data, data);
        }
      }
    }
  };

  onMounted(() => {
    ctx.$eventHub.$on('mis-component:linkage', handleLinkage);
  });

  return {
    onLinkageTrigger,
    handleLinkage
  };
}
