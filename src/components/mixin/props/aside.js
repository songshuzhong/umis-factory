export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object, String],
      required: false,
      default: 'Body',
      edit: {
        renderer: 'mis-input'
      }
    },
    classname: {
      type: String,
      required: false,
      default: '',
      edit: {
        renderer: 'mis-input'
      }
    }
  },
}
