export default {
  methods: {
    getSlimmingProps(props = {}, extend = {}) {
      const { hiddenOn, visibleOn, transition, ...other } = props;
      return { ...other, ...extend, disabled: this.iDisabled };
    },
    getFattingProps(props, extend = {}) {
      const { data, header, body, footer, ...other } = props;
      return { ...other };
    },
    getInitData(data, extend = {}) {
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
