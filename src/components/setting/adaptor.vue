<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header" class="umis-setting__header">
      <el-tooltip
        content="可在代码块中根据[api路径]和[method类型]适配指定的Reponse数据"
        placement="top-start"
      >
        <span>接口适配器 <i class="el-icon-info" /> </span>
      </el-tooltip>
      <el-button plain size="mini" type="primary" @click="onSave">
        应用
      </el-button>
    </div>
    <div ref="umisAdaptorEditor" class="umis-setting__style-editor" />
  </el-card>
</template>

<script>
import {
  Card as ElCard,
  ButtonGroup as ElButtonGroup,
  Button as ElButton,
  Tooltip as ElTooltip,
} from 'element-ui';
import beautify from 'beautify';
import monaco from '../mixin/monaco';

export default {
  name: 'SettingAdaptor',
  components: {
    ElCard,
    ElButtonGroup,
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
        if (val) {
          this.schema = val;
        }
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
      this.editor = window.monaco.editor.create(this.$refs.umisAdaptorEditor, {
        language: 'javascript',
        ...this.defaultConfig,
      });
      const javascript = beautify(this.schema, { format: 'js' });
      this.editor.setValue(javascript);
      this.handleFormatSchema(this.editor);
    },
    onSave() {
      const json = this.editor.getValue();
      this.$saveAdaptor(this, json).then(() => {
        this.schema = json;
      });
    },
  },
};
</script>
