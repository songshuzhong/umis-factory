<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="常规" name="normal">
      <el-form
        ref="normalForm"
        size="mini"
        class="umis-form__container"
        :model="normalProps"
      >
        <el-form-item
          v-for="(value, key, index) in normalProps"
          :key="index"
        >
          <span class="umis-form__field">
            <span class="umis-form__field__label">{{key}}</span>
            <el-tooltip content="asdfasfasfert2435234525435">
              <i class="el-icon-info" />
            </el-tooltip>
          </span>
          <el-input v-model="normalProps[key]" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="接口" name="api">
      <el-form
        v-if="hasApiProps"
        ref="apiForm"
        size="mini"
        class="umis-form__container"
        :model="iApiProps"
      >
        <el-form-item
          v-for="(value, key, index) in iApiProps"
          :key="index"
          :label="key"
        >
          <template #label>
            <span class="umis-form__field">
              <span class="umis-form__field__label">{{key}}</span>
              <el-tooltip content="asdfasfasfert2435234525435">
                <i class="el-icon-info" />
              </el-tooltip>
            </span>
          </template>
          <el-input v-model="iApiProps[key]" />
        </el-form-item>
      </el-form>
      <div v-else>该组件无API属性。</div>
    </el-tab-pane>
    <el-tab-pane label="数据" name="data">初始化数据</el-tab-pane>
    <el-tab-pane label="节点" name="nodes">节点</el-tab-pane>
  </el-tabs>
</template>
<script>
import { ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElTooltip } from 'element-plus';
const disalbedProps = ['renderer', 'path', 'action', 'actions', 'afterAction', 'linkageTrigger'];

export default {
  name: 'PropsEditor',
  components: {
    ElTabs,
    ElTabPane,
    ElForm,
    ElFormItem,
    ElInput,
    ElTooltip
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    apiProps: {
      type: Object,
      required: true
    }
  },
  data() {
    const normalProps = {};
    const iApiProps = this.apiProps || {};
    const nodeProps = {};
    const dataProps = {};
    let hasApiProps = true;
    let hasNodeProps = false;

    if (iApiProps) {
      iApiProps.url = iApiProps.initApi.url || '';
      iApiProps.method = iApiProps.initApi.method || '';
      iApiProps.params = JSON.stringify(iApiProps.initApi.params) || '';
    }
    delete iApiProps.initApi;
    for (const key in this.value) {
      if (this.value.hasOwnProperty(key)) {
        if (['header', 'body', 'footer'].includes(key)) {
          hasNodeProps = true;
          nodeProps.header = this.value[key].header;
          nodeProps.body = this.value[key].body;
          nodeProps.footer = this.value[key].footer;
        } else if (!disalbedProps.includes(key)) {
          normalProps[key] = this.value[key];
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
  }
}
</script>
