<template>
  <div class="umis-editor__container">
    <transition name="el-zoom-in-center">
      <el-alert
        v-if="showErrorBoundary"
        class="umis-editor__container__error-info"
        :title="errorInfo"
        type="error"
        show-icon
        @close="closeErrorInfo"
      />
    </transition>
    <div ref="editor" class="monaco-editor" />
    <transition name="el-zoom-in-bottom">
      <div v-if="!showErrorBoundary" class="umis-editor__container__tools">
        <el-button type="primary" @click="onSave">
          保存到本地
        </el-button>
        <el-button type="primary" @click="onSaveRemote">
          保存到远程
        </el-button>
      </div>
    </transition>
  </div>
</template>
<script>
import { Button as ElButton } from 'element-ui';
import { Alert as ElAlert } from 'element-ui';

import monaco from './mixin/monaco';

export default {
  name: 'MisEditor',
  components: {
    ElButton,
    ElAlert,
  },
  data() {
    return {
      errorInfo: '',
      schema: {},
      pageInfo: {},
      showErrorBoundary: false,
    };
  },
  mixins: [monaco],
  mounted() {
    const { pageSchema, pageInfo } = window.UMIS;
    this.pageInfo = pageInfo;
    this.editor = window.monaco.editor.create(this.$refs.editor, {
      ...this.defaultConfig,
      language: 'json',
      theme: 'vs-dark',
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
      this.handleFormatSchema(this.editor);
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
          this.handleFormatSchema(this.editor);
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
