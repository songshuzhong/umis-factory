export default {
  name: 'MixinProps',
  props: {
    hiddenOn: {
      type: String,
      required: false,
    },
    visibleOn: {
      type: String,
      required: false,
    },
    disabledOn: {
      type: String,
      required: false,
    },
    transition: {
      type: String,
      required: false,
      default: 'el-fade-in-linear',
    },
  },
}
