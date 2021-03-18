export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: 'name'
      }
    },
    value: {
      type: [Array, String],
      required: false
    },
    min: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '最小长度'
      }
    },
    max: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '最大长度'
      }
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '是否多选'
      }
    },
    body: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true,
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: 'List 选项',
        controls: [
          {
            renderer: 'mis-input',
            name: 'value',
            label: '值'
          },
        ]
      }
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
}
