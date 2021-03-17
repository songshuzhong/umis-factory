export default {
  name: 'MixinProps',
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    type: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '类型'
      }
    },
    readonly: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: '是否只读'
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: '不可用'
      }
    },
    editable: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '是否可编辑'
      }
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '是否可清除'
      }
    },
    size: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '大小'
      }
    },
    placeholder: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '占位文案'
      }
    },
    startPlaceholder: {
      type: String,
      required: false,
      default: '开始日期',
      edit: {
        renderer: 'mis-input',
        tip: '开始日期占位符'
      }
    },
    endPlaceholder: {
      type: String,
      required: false,
      default: '结束日期占位符'
    },
    rangeSeparator: {
      type: String,
      required: false,
      default: '至',
      edit: {
        renderer: 'mis-input',
        tip: '连接文案'
      }
    },
    defaultValue: {
      type: Date,
      required: false,
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY年MM月DD日',
      edit: {
        renderer: 'mis-input',
        tip: '格式化模板，例：YYYY年MM月DD日'
      }
    },
    align: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '连接文案'
      }
    },
    prefixIcon: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '前缀Icon'
      }
    },
    unlinkPanels: {
      type: Boolean,
      required: false,
    },
    clearIcon: {
      type: String,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    },
  },
}
