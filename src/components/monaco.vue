<template>
  <div class="umis-editor-container">
    <transition name="el-zoom-in-center">
      <el-alert
        v-if="showErrorBoundary"
        class="monaco-editor__error-info"
        title="错误"
        type="error"
        show-icon
        :description="errorInfo"
        @close="closeErrorInfo"
      />
    </transition>
    <div ref="editor" class="monaco-editor" />
    <div class="umis-editor-tools">
      <el-button type="primary" plain @click="onSave">保存到本地</el-button>
      <el-button type="primary" plain @click="onSaveRemote"
        >保存到远程</el-button
      >
    </div>
  </div>
</template>
<script>
import { Button as ElButton } from 'element-ui';
import { Alert as ElAlert } from 'element-ui';

export default {
  name: 'MisMonaco',
  components: {
    ElButton,
    ElAlert,
  },
  data() {
    return {
      errorInfo: '',
      schema: {},
      showErrorBoundary: false,
      pageInfo: {},
    };
  },
  created() {
    this.onFormatSchema();
  },
  mounted() {
    const { pageSchema, pageInfo } = window.UMIS;
    this.pageInfo = pageInfo;
    this.editor = window.monaco.editor.create(this.$refs.editor, {
      fontSize: '14px',
      language: 'json',
      autoIndent: true,
      formatOnType: true,
      formatOnPaste: true,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    });
    this.updateSchema(pageSchema);
  },
  methods: {
    updateSchema(pageSchema) {
      this.schema = {
        schema: 'https://github.com/songshuzhong/umis/v1/schemas/page.json',
        ...pageSchema,
      };
      this.editor.setValue(JSON.stringify(this.schema));
      this.onFormatSchema();
    },
    onFormatSchema() {
      const timer = setTimeout(() => {
        this.editor.getAction(['editor.action.formatDocument']).run();
        clearTimeout(timer);
      }, 100);
    },
    onSaveRemote() {
      this.onSave().then(pageSchema => {
        this.$api
          .slientApi()
          .put('/api/page', {
            pageSchema: JSON.stringify(pageSchema),
            ...this.pageInfo,
          })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            this.$message({
              message: error.message,
              showClose: true,
              type: ' error',
            });
          });
      });
    },
    onSave() {
      return new Promise((resolve, reject) => {
        try {
          const json = this.editor.getValue();
          const schema = JSON.parse(json);
          this.$eventHub.$emit('mis-schema:change', schema);
          this.onFormatSchema();
          this.$message({
            message: '保存成功',
            showClose: true,
            type: 'success',
          });
          resolve(schema);
        } catch (e) {
          this.errorInfo = e;
          this.showErrorBoundary = true;
          this.errorInfoTimer = setTimeout(() => {
            this.closeErrorInfo();
            clearTimeout(this.errorInfoTimer);
          }, 3500);
          reject();
        }
      });
    },
    closeErrorInfo() {
      this.showErrorBoundary = false;
    },
  },
};
</script>
<style lang="scss">
.monaco-editor {
  width: 100%;
  height: calc(100vh - 110px);
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-align: left;
}

.umis-editor-container {
  width: 100%;
  margin: 0 auto;
  background-color: #282a36 !important;
}
.umis-editor-tools {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.monaco-editor__error-info {
  line-height: 12px;
  text-align: left;
}
</style>
