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
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    title: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '标题'
      }
    },
    columns: {
      type: Array,
      required: true,
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: '表格列',
        controls: [
          {
            renderer: 'mis-input',
            name: 'label',
            label: '列名'
          },
          {
            renderer: 'mis-input',
            name: 'name',
            label: '列索引'
          }
        ]
      }
    },
    actions: {
      type: Array,
      required: false,
    },
    action: {
      type: Function,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '高度'
      }
    },
    maxHeight: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '最大高度'
      }
    },
    stripe: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '是否为斑马纹 table'
      }
    },
    border: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-switch',
        tip: '是否带有纵向边框'
      }
    },
    fit: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '列的宽度是否自撑开'
      }
    },
    showDynamicColumn: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '显示动态列'
      }
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '当前行高亮'
      }
    },
    highlightCurrentRow: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch'
      }
    },
    showExport: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-switch',
        tip: '支持导出功能'
      }
    },
    hasPageInfo: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-switch',
        tip: '支持分页功能'
      }
    },
  }
}
