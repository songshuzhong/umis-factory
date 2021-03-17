export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object],
      required: false,
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
    gutter: {
      type: Number,
      required: false,
      default: 0,
      edit: {
        renderer: 'mis-input'
      }
    },
    type: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    justify: {
      type: String,
      required: false,
      options: ['start', 'end', 'center', 'space-around', 'space-between'],
      default: 'start',
      edit: {
        renderer: 'mis-input'
      }
    },
    align: {
      type: String,
      required: false,
      options: ['top', 'middle', 'bottom'],
      default: 'top',
      edit: {
        renderer: 'mis-input'
      }
    },
    tag: {
      type: String,
      required: false,
      default: 'div',
      edit: {
        renderer: 'mis-input'
      }
    },
  },
}
