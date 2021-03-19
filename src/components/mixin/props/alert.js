export default {
  name: 'MixinProps',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title',
      edit: {
        renderer: 'mis-input',
        tip: '标题'
      }
    },
    type: {
      type: String,
      required: false,
      default: 'success',
      edit: {
        renderer: 'mis-input',
        tip: '主体'
      }
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input',
        tip: '是否显示图标'
      }
    },
    description: {
      type: String,
      required: false,
      default: 'Description',
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    closable: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '是否可关闭'
      }
    },
    center: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '文字是否居中'
      }
    },
    closeText: {
      type: String,
      required: false,
      default: '关闭',
      edit: {
        renderer: 'mis-input',
        tip: '关闭按钮自定义文本'
      }
    },
    classname: {
      type: String,
      required: false,
      default: '',
      edit: {
        renderer: 'mis-input',
        tip: '自定义样式类名'
      }
    },
  },
}
