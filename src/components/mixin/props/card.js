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
      type: [Array, Object, String],
      required: false,
      default: 'Body',
      edit: {
        renderer: 'mis-input'
      }
    },
    header: {
      type: [Array, Object, String],
      required: false,
      default: 'Header',
      edit: {
        renderer: 'mis-input'
      }
    },
    footer: {
      type: [Array, Object, String],
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
      edit: {
        renderer: 'mis-input'
      }
    },
    bodyStyle: {
      type: Object,
      required: false,
      default: { padding: 0 },
      edit: {
        renderer: 'mis-input'
      }
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
  },
}
