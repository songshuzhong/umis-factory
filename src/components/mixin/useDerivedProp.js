export default function () {
  const getSlimmingProps = (props = {}, extend = {}) => {
    const { hiddenOn, transition, ...other } = props;
    return { ...other, ...extend };
  };
  const getFattingProps = (props, extend = {}) => {
    const { data, header, body, footer, ...other } = props;
    return { ...other };
  };
  const getInitData = (data, extend = {}) => {
    if (Object.prototype.toString.call(data) === '[object Array]') {
      return { rows: data, ...extend.initData };
    }
    return { ...data, ...extend.initData };
  };
  const getHeader = (props) => {
    return props.header;
  };
  const getBody = (props) => {
    return props.body;
  };
  const getFooter = (props) => {
    return props.footer;
  };

  return {
    getSlimmingProps,
    getFattingProps,
    getInitData,
    getHeader,
    getBody,
    getFooter
  };
}
