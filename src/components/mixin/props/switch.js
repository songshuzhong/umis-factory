export default {
  name: 'MixinProps',
  props: {
    name: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: 'name'
      }
    },
    label: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'label'
      }
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: 'disabled'
      }
    },
    width: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'width'
      }
    },
    activeIconClass: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'activeIconClass'
      }
    },
    activeText: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'activeText'
      }
    },
    inActiveText: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'inActiveText'
      }
    },
    activeValue: {
      type: [Boolean, String, Number],
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input',
        tip: 'activeValue'
      }
    },
    inActiveValue: {
      type: [Boolean, String, Number],
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input',
        tip: 'inActiveValue'
      }
    },
    activeColor: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'activeColor'
      }
    },
    inActiveColor: {
      type: String,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: 'inActiveColor'
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
      required: true,
    },
    updateValue: {
      type: Function,
      required: false,
    }
  },
}
