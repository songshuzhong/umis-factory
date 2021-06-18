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
      edit: {
        renderer: 'mis-input',
        tip: 'name'
      }
    },
    value: {
      type: [String, Number],
      required: false,
    },
    label: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    type: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
      }
    },
    readonly: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
      }
    },
    minlength: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    maxlength: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    showWordLimit: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
      }
    },
    showPassword: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
      }
    },
    placeholder: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    clearable: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
      }
    },
    size: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    prefixIcon: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    suffixIcon: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    append: {
      type: Object,
      required: false,
      edit: {
        renderer: 'mis-input',
      }
    },
    updateValue: {
      type: Function,
      required: false,
    }
  },
}
