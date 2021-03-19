export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    visible: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    title: {
      type: String,
      required: false,
      default: 'Dialog',
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    width: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    fullscreen: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    modal: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    lockScroll: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    closeOnModal: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    destroyOnClose: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
    header: {
      type: [Array, Object],
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    body: {
      type: [Array, Object],
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    footer: {
      type: [Array, Object],
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    classname: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '辅助性文字'
      }
    },
    onPopupInvisible: {
      type: Function,
      required: false,
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '辅助性文字'
      }
    },
  },
}
