export default {
  name: 'MixinProps',
  props: {
    options: {
      type: Array,
      required: true,
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: '选项',
        controls: [
          {
            renderer: 'mis-input',
            name: 'text',
            label: '文案'
          },
          {
            renderer: 'mis-input',
            name: 'value',
            label: '值'
          }
        ]
      }
    },
    name: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '属性名'
      }
    },
    type: {
      type: String,
      required: false,
      default: 'checkbox',
      options: ['checkbox', 'button'],
      edit: {
        renderer: 'mis-input',
        tip: '类型'
      }
    },
    value: {
      type: [Array, String, Number],
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    },
  },
}
