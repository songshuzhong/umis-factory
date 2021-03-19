<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="常规" name="normal">
      <mis-form
        ref="normalFormRef"
        label-position="top"
        :controls="normalProps.controls"
      />
    </el-tab-pane>
    <el-tab-pane label="接口" name="api">
      <mis-form
        ref="apiFormRef"
        label-position="top"
        :controls="iApiProps.controls"
      />
    </el-tab-pane>
    <el-tab-pane label="数据" name="data">初始化数据</el-tab-pane>
    <el-tab-pane label="节点" name="nodes">节点</el-tab-pane>
  </el-tabs>
</template>
<script>
import { ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElTooltip } from 'element-plus';
import MisForm from '../form/form';
const disalbedProps = ['renderer', 'value', 'data', 'path', 'action', 'actions', 'afterAction', 'linkageTrigger', 'handleInvisible', 'onPopupInvisible', 'updateValue'];

export default {
  name: 'PropsEditor',
  components: {
    ElTabs,
    ElTabPane,
    ElForm,
    ElFormItem,
    ElInput,
    ElTooltip,
    MisForm
  },
  props: {
    activeRenderer: {
      type: String,
      required: true
    },
    activeJson: {
      type: Object,
      required: true
    },
    originNormalProps: {
      type: Object,
      required: true
    },
    originApiProps: {
      type: Object,
      required: true
    },
    apiProps: {
      type: Object,
      required: true
    },
    editTabChange: {
      type: Function,
      required: true
    }
  },
  data() {
    const normalProps = {
      name: 'normalForm',
      renderer: 'mis-form',
      labelPosition: 'top',
      controls: []
    };
    const iApiProps = {
      name: 'apiForm',
      renderer: 'mis-form',
      labelPosition: 'top',
      controls: []
    };
    const nodeProps = {};
    const dataProps = {};
    let hasApiProps = true;
    let hasNodeProps = false;

    for (const key in this.originApiProps) {
      if (this.originApiProps.hasOwnProperty(key)) {
        const value = this.activeJson[key];
        const { renderer, ...other } = this.originApiProps[key].edit;
        iApiProps.controls.push({
          renderer,
          value,
          ...other
        });
      }
    }
    for (const key in this.originNormalProps) {
      if (this.originNormalProps.hasOwnProperty(key)) {
        if (['header', 'body', 'footer'].includes(key)) {
          hasNodeProps = true;
          nodeProps.header = this.originNormalProps[key].header;
          nodeProps.body = this.originNormalProps[key].body;
          nodeProps.footer = this.originNormalProps[key].footer;
        } else if (!disalbedProps.includes(key)) {
          const value = this.activeJson[key];
          const { renderer, ...other } = this.originNormalProps[key].edit;
          normalProps.controls.push({
            renderer,
            value,
            name: key,
            label: key,
            ...other
          });
        }
      }
    }
    return {
      activeTab: 'normal',
      hasApiProps,
      hasNodeProps,
      normalProps,
      iApiProps,
      nodeProps,
      dataProps
    }
  },
  watch: {
    activeTab: {
      handler(val) {
        this.editTabChange(val);
      },
      immediate: true
    }
  }
}
</script>
