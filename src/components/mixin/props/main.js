export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: [Object, Array],
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    routerView: {
      type: Boolean,
      required: false,
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
    iProtal: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input'
      }
    },
  },
}
