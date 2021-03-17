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
    body: {
      type: [Object, Array],
      required: true,
      edit: {
        renderer: 'mis-input'
      }
    },
    direction: {
      type: String,
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
  },
}
