export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        name: 'name',
        lable: 'name'
      }
    },
    body: {
      type: [Array, Object],
      required: false,
      default: 'Body',
      edit: {
        renderer: 'mis-input'
      }
    },
    header: {
      type: String,
      required: false,
      default: 'Header',
      edit: {
        renderer: 'mis-input'
      }
    },
    footer: {
      type: [Array, Object],
      required: false,
      default: 'Footer',
      edit: {
        renderer: 'mis-input'
      }
    },
    actions: {
      type: [Object, Array],
      required: false,
    },
    action: {
      type: Function,
      required: true,
    },
    classname: {
      type: String,
      required: false,
      default: '',
      edit: {
        renderer: 'mis-input'
      }
    },
    bodyStyle: {
      type: Object,
      required: false,
    },
    shadow: {
      type: String,
      required: false,
      options: ['always', 'hover', 'never'],
      default: 'always',
      edit: {
        renderer: 'mis-select',
        name: 'shadow',
        label: 'shadow',
        value: 'always',
        tip: '阴影',
        options: [
          {
            text: '一直',
            value: 'always'
          },
          {
            text: '悬浮',
            value: 'hover'
          },
          {
            text: '永不',
            value: 'never'
          }
        ]
      }
    },
    gutter: {
      type: Number,
      required: false,
      default: 0,
      edit: {
        renderer: 'mis-input',
        label: 'gutter',
        name: 'gutter',
        value: 0,
        tip: '间隔'
      }
    },
    span: {
      type: Number,
      required: false,
      default: 12,
      edit: {
        renderer: 'mis-input',
        label: ' span',
        name: 'span',
        value: 12,
        tip: '列数'
      }
    },
    size: {
      type: Array,
      required: false,
      default: [24, 12, 8, 4],
      edit: {
        renderer: 'mis-input',
        label: 'size',
        name: 'size',
        tip: '响应式'
      }
    },
    hasPageInfo: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        label: 'hasPageInfo',
        name: 'hasPageInfo',
        value: false,
        tip: '分页'
      }
    }
  },
}
