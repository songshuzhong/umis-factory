export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
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
    computedClass: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    height: {
      type: Number,
      required: false,
      default: 60,
      edit: {
        renderer: 'mis-input'
      }
    }
  },
}
