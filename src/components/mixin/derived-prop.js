export default {
  methods: {
    getSlimmingProps(props = {}, extend = {}) {
      const { hiddenOn, transition, ...other } = props;
      return { ...other, ...extend, disabled: this.iDisabled };
    },
    getFattingProps(props, extend = {}) {
      const { data, header, body, footer, ...other } = props;
      return { ...other };
    },
    getInitData(data, extend = {}) {
      if (Object.prototype.toString.call(data) === '[object Array]') {
        return { rows: data, ...extend.initData };
      }
      return { ...data, ...extend.initData };
    },
    getHeader(props) {
      return props.header;
    },
    getBody(props) {
      return props.body;
    },
    getFooter(props) {
      return props.footer;
    },
  },
};
