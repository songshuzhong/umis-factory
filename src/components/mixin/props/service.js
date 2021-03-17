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
        renderer: 'mis-input'
      }
    },
    header: {
      type: [Array, Object],
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    body: {
      type: [Array, Object],
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    footer: {
      type: [Array, Object],
      required: false,
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
    },
    target: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
  },
}
