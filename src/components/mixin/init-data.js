import clonedeep from 'lodash.clonedeep';

export default {
  props: {
    initData: {
      type: Object,
      required: false,
      default: {},
    },
    initRows: {
      type: Array,
      required: false,
      default: []
    },
    inherit: {
      type: Object,
      required: false,
      default: function() {
        return {
          type: 'all',
          value: []
        };
      }
    }
  },
  data() {
    return {
      data: {},
      rows: ''
    };
  },
  watch: {
    initRows: {
      handler(val) {
        if (this.inherit) {
          this.rows = val;
        }
      },
      immediate: true,
      deep: true,
    },
    initData: {
      handler(val) {
        let mergeData = {};
        if (this.inherit.type !== 'none') {
          if (this.inherit.type === 'all') {
            mergeData = Object.assign({}, this.data, val);
          } else if (this.inherit.type === 'include') {
            this.inherit.value.forEach(key => {
              if (val.hasOwnProperty(key)) {
                mergeData[key] = clonedeep(val[key]);
              }
            });
            mergeData = Object.assign({}, this.data, mergeData);
          } else if (this.inherit.type === 'exclude') {
            for (let key in val) {
              if (val.hasOwnProperty(key) && !this.inherit.value.includes(key)) {
                mergeData[key] = clonedeep(val[key]);
              }
            }
          }
        }
        this.data = mergeData;
      },
      immediate: true,
      deep: true,
    },
  },
};
