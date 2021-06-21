export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false,
    },
    beforeClose: {
      type: Function,
      required: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      required: false,
      default: true,
    },
    classname: {
      type: String,
      required: false,
    },
    modal: {
      type: Boolean,
      required: false,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      required: false,
      default: true,
    },
    direction: {
      type: String,
      required: false,
      options: ['rtl', 'ltr', 'ttb', 'btt'],
      default: 'rtl',
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: [String, Number],
      required: false,
      default: '30%',
    },
    header: {
      type: [String, Object],
      required: false,
    },
    visible: {
      type: Boolean,
      required: false,
    },
    wrapperClosable: {
      type: Boolean,
      required: false,
    },
    withHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object],
      required: true,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
    onPopupInvisible: {
      type: Function,
      required: false,
    },
  },
}