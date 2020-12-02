import clonedeep from 'lodash.clonedeep';

export default {
  mounted() {
    this.$eventHub.$on('mis-component:linkage', this.handleLinkage);
  },
  methods: {
    onLinkageTrigger(target, data) {
      if (target) {
        const trigerData = data || this.data;
        this.$eventHub.$emit('mis-component:linkage', target, trigerData);
      }
    },
    getURLParameters(url) {
      return url.match(/([^?=&]+)(=([^&]*))/g).reduce((total, item) => {
        const [key, value] = item.split('=');
        total[key] = value.replace('${', '').replace('}', '');
        return total;
      }, {});
    },
    handleLinkage(linkage, data) {
      if (linkage) {
        const [target, url] = linkage.split('?');
        let newData = {};
        if (this.name && target === this.name) {
          if (url) {
            const fields = this.getURLParameters(url);
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
            newData = Object.assign({}, this.data, newData);
          } else {
            newData = Object.assign({}, this.data, data);
          }
          this.data = clonedeep(newData);
        }
      }
    },
  },
};
