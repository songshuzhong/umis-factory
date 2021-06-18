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
        renderer: 'mis-input',
        name: 'name',
        lable: 'name'
      }
    },
    controls: {
      type: Array,
      required: false,
      default: [],
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: '表格列',
        controls: [
          {
            renderer: 'mis-input',
            name: 'renderer',
            label: '表单项'
          },
        ]
      }
    },
    fieldset: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '是否开启表单域'
      }
    },
    labelWidth: {
      type: [String, Number],
      required: false,
      default: 'auto',
      edit: {
        renderer: 'mis-input',
        tip: 'label宽度',
      }
    },
    labelPosition: {
      type: String,
      required: false,
      default: 'right',
      edit: {
        renderer: 'mis-input',
        tip: 'label位置',
      }
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '行内'
      }
    },
    redirect: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '提交后跳转',
      }
    },
    reload: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '刷新目标组件名',
      }
    },
    target: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '关联目标组件名',
      }
    },
    linkageType: {
      type: String,
      required: false,
      default: 'after',
      edit: {
        renderer: 'mis-input',
        tip: '联动顺序',
      }
    },
    linkageTrigger: {
      type: Function,
      required: true,
    },
  },
}
