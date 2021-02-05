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
      type: Boolean,
      required: false,
      default: true
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
        if (this.inherit) {
          const mergeData = Object.assign({}, this.data, val);
          this.data = clonedeep(mergeData);
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
