<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header" class="umis-setting__header">
      <span>全局样式</span>
      <el-button plain size="mini" type="primary" @click="onSave">
        应用
      </el-button>
    </div>
    <div ref="umisStyleEditor" class="umis-setting__style-editor" />
  </el-card>
</template>
<script>
import { ElCard, ElButton } from 'element-plus';

export default {
  name: 'SettingStyle',
  components: {
    ElCard,
    ElButton,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  watch: {
    value: {
      handler(val) {
        this.schema = val;
      },
      immediate: true,
    },
    schema: {
      handler(val) {
        this.$emit('input', val);
      },
    },
  },
  data() {
    return {
      schema: '',
    };
  },
  mounted() {
    window.requestIdleCallback(this.createMonacoEditor);
  },
  methods: {
    createMonacoEditor() {
      this.editor = window.monaco.editor.create(this.$refs.umisStyleEditor, {
        fontSize: '14px',
        language: 'css',
        autoIndent: true,
        formatOnType: true,
        formatOnPaste: true,
        selectOnLineNumbers: true,
        scrollBeyondLastLine: false,
        folding: true,
        theme: 'vs',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      });

      this.editor.setValue(this.schema);
      this.onFormatSchema();
    },
    onFormatSchema() {
      const timer = setTimeout(() => {
        this.editor.getAction(['editor.action.formatDocument']).run();
        clearTimeout(timer);
      }, 100);
    },
    onSave() {
      const json = this.editor.getValue();
      this.$saveInitStyle(this, json).then(() => {
        this.schema = json;
      });
    },
  },
};
</script>
<style lang="scss">
.umis-setting__style-editor {
  height: 300px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-align: left;
  .monaco-editor {
    width: 100% !important;
  }
}
</style>
