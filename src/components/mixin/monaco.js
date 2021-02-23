export default {
  created() {
    this.defaultConfig = {
      theme: 'vs',
      inherit: false,
      fontSize: '14px',
      autoIndent: true,
      formatOnType: true,
      formatOnPaste: true,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    };
  },
  methods: {
    handleFormatSchema(editor) {
      const timer = setTimeout(() => {
        editor
          .getAction(['editor.action.formatDocument'])
          .run()
          .then(() => {
            clearTimeout(timer);
          });
      }, 100);
    },
  },
};
