export default {
  name: 'MixinProps',
  props: {
    options: {
      type: Array,
      required: false,
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: '选项',
        controls: [
          {
            renderer: 'mis-input',
            name: 'text',
            label: '文案'
          },
          {
            renderer: 'mis-input',
            name: 'value',
            label: '值'
          }
        ]
      }
    },
    name: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '属性名'
      }
    },
    value: {
      type: [Array, String, Number],
      required: false,
    },
    size: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'size'
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'disabled'
      }
    },
    clearable: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'clearable'
      }
    },
    multiple: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'multiple'
      }
    },
    joinValue: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'joinValue'
      }
    },
    filterable: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'filterable'
      }
    },
    placeholder: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'placeholder'
      }
    },
    cached: {
      type: Object,
      required: false,
      default: {},
      edit: {
        renderer: 'mis-input',
        tip: 'cached'
      }
    },
    target: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'target'
      }
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
}
