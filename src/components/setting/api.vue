<template>
  <el-card class="umis-setting__card-margin" shadow="hover">
    <div slot="header" class="umis-setting__header">
      <el-tooltip
        content="选中的域名将作为接口请求的路径前缀"
        placement="top-start"
      >
        <span>域名选择器 <i class="el-icon-info" /> </span>
      </el-tooltip>
      <el-button-group>
        <el-button plain size="mini" type="primary" @click="onAdd">
          添加
        </el-button>
        <el-button plain size="mini" type="primary" @click="onSave">
          应用
        </el-button>
      </el-button-group>
    </div>
    <el-radio-group v-model="checked" class="umis-setting__api-editor">
      <div
        v-for="(value, key) in domains"
        class="umis-setting__api-editor__item"
      >
        <el-link
          :underline="false"
          class="umis-setting__api-editor__delete"
          icon="el-icon-delete"
          @click="onDelete(key)"
        />
        <el-input
          class="umis-setting__api-editor__label"
          :key="key"
          v-model="key"
        />
        <el-input
          class="umis-setting__api-editor__value"
          :key="key"
          placeholder="请输入域名"
          v-model="domains[key]"
        />
        <el-radio
          class="umis-setting__api-editor__radio"
          :label="key"
          :key="key"
        >
          {{ '' }}
        </el-radio>
      </div>
    </el-radio-group>
  </el-card>
</template>
<script>
import clonedeep from 'lodash.clonedeep';
import {
  Card as ElCard,
  RadioGroup as ElRadioGroup,
  Radio as ElRadio,
  ButtonGroup as ElButtonGroup,
  Button as ElButton,
  Link as ElLink,
  Input as ElInput,
  Tooltip as ElTooltip,
} from 'element-ui';

export default {
  name: 'SettingDomain',
  components: {
    ElCard,
    ElRadioGroup,
    ElRadio,
    ElButtonGroup,
    ElButton,
    ElLink,
    ElInput,
    ElTooltip,
  },
  props: {
    value: {
      type: Array,
      required: false,
    },
    onApiChanged: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      domains: this.$umisConfig.domains,
      checked: 'VUE_APP_API_ACTIVE',
    };
  },
  watch: {
    value: {
      handler(val) {
        this.domains = val;
      },
      immediate: true,
      deep: true,
    },
    domains: {
      handler(val) {
        this.$emit('input', val);
      },
    },
    checked: {
      handler() {
        this.onApiChanged();
      },
    },
  },
  methods: {
    onAdd() {
      const length = Object.keys(this.domains).length;
      const domains = clonedeep(this.domains);
      domains[`VUE_APP_API_BASE${length}`] = '';
      this.domains = domains;
    },
    onDelete(key) {
      if (this.checked === key) {
        this.$notice({
          type: 'error',
          title: '错误',
          message: '该前缀在使用中！！',
        });
        return;
      }
      const domains = clonedeep(this.domains);
      delete domains[key];
      this.domains = domains;
    },
    onSave() {
      this.$notice({
        type: 'success',
        title: '通知',
        message: '保存成功！',
      });
      this.$umisConfig.VUE_APP_API_ACTIVE = this.domains[this.checked];
      this.$umisConfig.isApiChanged = true;
    },
  },
};
</script>
