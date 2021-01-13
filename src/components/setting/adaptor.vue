<template>
  <el-card class="umis-setting__card-margin" shadow="hover">
    <template #header>
      <div class="umis-setting__header">
        <el-tooltip
            content="可在代码块中根据【api】、【method】和【params】适配指定的Reponse数据"
            placement="top-start"
        >
          <span>接口适配器 <i class="el-icon-info" /> </span>
        </el-tooltip>
        <el-button plain size="mini" type="primary" @click="onSave">
          应用
        </el-button>
      </div>
    </template>
    <div ref="umisAdaptorEditor" class="umis-setting__style-editor" />
  </el-card>
</template>

<script>
import {
  ElCard,
  ElButtonGroup,
  ElButton,
  ElTooltip,
} from 'element-plus';
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
    onSave(silent) {
      const json = this.editor.getValue();
      return this.$saveAdaptor(this, json).then(() => {
        this.schema = json;
        if (silent === true) {
          return;
        }
        this.$notice({
          type: 'success',
          title: '通知',
          message: '接口适配器修改成功',
        });
      });
    },
  },
};
</script>
