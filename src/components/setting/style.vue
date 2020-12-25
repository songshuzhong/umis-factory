<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header" class="umis-setting__header">
      <el-tooltip
        content="应用后的样式将全局作用于当前工作区"
        placement="top-start"
      >
        <span>全局样式 <i class="el-icon-info" /> </span>
      </el-tooltip>
      <el-button plain size="mini" type="primary" @click="onSave">
        应用
      </el-button>
    </div>
    <div ref="umisStyleEditor" class="umis-setting__style-editor" />
  </el-card>
</template>
<script>
import {
  Card as ElCard,
  Button as ElButton,
  Tooltip as ElTooltip,
} from 'element-ui';

import beautify from 'beautify';
import monaco from '../mixin/monaco';

export default {
  name: 'SettingStyle',
  components: {
    ElCard,
    ElButton,
    ElTooltip,
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
  mixins: [monaco],
  mounted() {
    window.requestIdleCallback(this.createMonacoEditor);
  },
  methods: {
    createMonacoEditor() {
      this.editor = window.monaco.editor.create(this.$refs.umisStyleEditor, {
        language: 'css',
        ...this.defaultConfig,
      });
      const style = beautify(this.schema, { format: 'css' });
      this.editor.setValue(style);
      this.handleFormatSchema(this.editor);
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
