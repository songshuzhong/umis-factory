export default {
  name: 'MixinProps',
  props: {
    body: {
      type: [Array, Object],
      required: false,
      default: 'Body',
      edit: {
        renderer: 'mis-input'
      }
    },
    path: {
      type: String,
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
  },
}
