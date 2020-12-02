export default {
  methods: {
    getSlimmingProps(props = {}, extend = {}) {
      const { data, hiddenOn, visibleOn, transition, ...other } = props;
      return { ...other, ...extend };
    },
    getFattingProps(props, extend = {}) {
      const { data, header, body, footer, ...other } = props;
      return { ...other };
    },
    getDataProps(props = {}, extend = {}) {
      const data = props.data || {};
      return Object.assign({}, data, extend);
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
