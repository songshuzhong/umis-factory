export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: '',
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    tabStyle: {
      type: Object,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    tabPosition: {
      type: String,
      required: false,
      options: ['left', 'right', 'top', 'bottom'],
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    stretch: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    activeName: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    body: {
      type: Array,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
  },
}
