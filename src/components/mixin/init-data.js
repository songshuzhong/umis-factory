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
    }
  },
  data() {
    return {
      data: {},
      rows: []
    };
  },
  watch: {
    initRows: {
      handler(val) {
        this.rows = val;
      },
      immediate: true,
      deep: true,
    },
    initData: {
      handler(val) {
        const mergeData = Object.assign({}, this.data, val);
        this.data = clonedeep(mergeData);
      },
      immediate: true,
      deep: true,
    },
  },
};
