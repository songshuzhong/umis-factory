export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    index: {
      type: [String, Number],
      required: false,
      default: '0',
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    body: {
      type: [Object, Array],
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    classname: {
      type: String,
      required: false,
      default: '',
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    computedClass: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
  },
}
