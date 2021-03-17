export default {
  name: 'MixinProps',
  props: {
    controls: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
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
      type: [Array, Object],
      required: false,
      default: {},
    },
    data: {
      type: [Array, Object],
      required: false,
      default: {},
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '是否可以多选'
      }
    },
    updateValue: {
      type: Function,
      required: true,
    },
    handleInvisible: {
      type: Function,
      required: false,
    },
  },
}
