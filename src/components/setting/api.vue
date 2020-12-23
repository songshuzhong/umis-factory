<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header" class="umis-setting__header">
      <span>接口拦截器</span>
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
import { Card as ElCard } from 'element-ui';
import { RadioGroup as ElRadioGroup } from 'element-ui';
import { Radio as ElRadio } from 'element-ui';
import { ButtonGroup as ElButtonGroup } from 'element-ui';
import { Button as ElButton } from 'element-ui';
import { Link as ElLink } from 'element-ui';
import { Input as ElInput } from 'element-ui';

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
