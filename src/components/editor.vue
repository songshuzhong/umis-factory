<template>
  <div
    class="umis-editor__container"
    :class="classname"
  >
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
    <div
      v-if="isJson"
      ref="editor"
      class="monaco-editor"
    />
    <toolmaker
      v-if="!isJson"
      :path="`${path}/toolmaker`"
    />
    <transition name="el-zoom-in-bottom">
      <div
        v-if="(!showErrorBoundary && editable)"
        class="umis-editor__container__tools"
      >
        <el-button
          v-if="isJson"
          size="mini"
          type="primary"
          @click="onChange"
        >
          拖拽模式
        </el-button>
        <el-button
          v-if="!isJson"
          size="mini"
          type="primary"
          @click="onChange"
        >
          JSON模式
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="onSave"
        >
          保存到本地
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="onSaveRemote"
        >
          保存到远程
        </el-button>
      </div>
    </transition>
  </div>
</template>
<script>
import { ElButton, ElAlert } from 'element-plus';

import monaco from './mixin/monaco';
import Toolmaker from './toolmaker/toolmaker';

export default {
  name: 'MisEditor',
  components: {
    ElButton,
    ElAlert,
    Toolmaker
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    schema: {
      type: Object,
      required: false,
      default: {}
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    },
    classname: {
      type: String,
      required: false,
      default: false
    },
  },
  data() {
    return {
      errorInfo: '',
      isJson: true,
      iSchema: {},
      pageInfo: {},
      showErrorBoundary: false,
    };
  },
  watch: {
    schema: {
      handler(val) {
        this.iSchema = val;
      },
      immediate: true
    },
    isJson: {
      handler(val, old) {
        if (val && !old) {
          this.$nextTick(() => {
            this.initEditor();
          });
        }
      }
    },
  },
  mixins: [monaco],
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      if (this.editable) {
        const { pageSchema, pageInfo } = window.UMIS;
        this.pageInfo = pageInfo;
        this.editor = window.monaco.editor.create(this.$refs.editor, {
          ...this.defaultConfig,
          language: 'json',
          theme: 'vs-dark',
        });
        this.updateSchema(pageSchema);
      } else {
        this.editor = window.monaco.editor.create(this.$refs.editor, {
          ...this.defaultConfig,
          theme: 'vs',
          language: 'json'
        });
        this.updateSchema(this.iSchema);
      }
    },
    onChange() {
      this.isJson = !this.isJson;
    },
    updateSchema(pageSchema) {
      this.iSchema = {
        schema: 'https://github.com/songshuzhong/umis/v1/schemas/page.json',
        ...pageSchema,
      };
      this.editor.setValue(JSON.stringify(this.iSchema));
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
