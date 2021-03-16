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
const disalbedProps = ['renderer', 'path', 'action', 'actions', 'afterAction', 'linkageTrigger'];

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
    editableProps: {
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
    const instance = this.$.appContext.components[this.activeRenderer];
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
        const { renderer, ...other } = this.originApiProps[key].edit;
        iApiProps.controls.push({
          renderer,
          ...other
        });
      }
    }
    for (const key in this.editableProps) {
      if (this.editableProps.hasOwnProperty(key)) {
        if (['header', 'body', 'footer'].includes(key)) {
          hasNodeProps = true;
          nodeProps.header = this.editableProps[key].header;
          nodeProps.body = this.editableProps[key].body;
          nodeProps.footer = this.editableProps[key].footer;
        } else if (!disalbedProps.includes(key)) {
          const { renderer, ...other } = instance.__props[0][key].edit;
          normalProps.controls.push({
            renderer,
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
