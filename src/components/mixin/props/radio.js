export default {
  name: 'MixinProps',
  props: {
    options: {
      type: Array,
      required: true,
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
    type: {
      type: String,
      required: false,
      default: 'radio',
      options: ['radio', 'button'],
      edit: {
        renderer: 'mis-input',
        tip: 'type'
      }
    },
    value: {
      type: String,
      required: false,
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
      required: true,
    }
  },
}
