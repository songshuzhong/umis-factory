export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: [Object, Array],
      required: true,
      default: 'Body',
      edit: {
        renderer: 'mis-input'
      }
    },
    classname: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
  },
}
