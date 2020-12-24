<template>
  <div class="umis-setting__cards">
    <el-card class="umis-setting__card-margin">
      <div slot="header">
        <el-tooltip content="全局数据提交类型" placement="top-start">
          <span>表单类型 <i class="el-icon-info" /> </span>
        </el-tooltip>
      </div>
      <el-switch
        v-model="isFormData"
        active-text="formdata"
        inactive-text="application/json"
        @change="handleFormTypeChange"
      />
    </el-card>
    <setting-creator />
    <setting-api v-model="domains" :on-api-changed="handleApiChanged" />
    <setting-adaptor v-model="adaptor" />
    <setting-style v-model="style" />
  </div>
</template>
<script>
import {
  Card as ElCard,
  Switch as ElSwitch,
  Tooltip as ElTooltip,
} from 'element-ui';

import SettingApi from './api';
import SettingStyle from './style';
import SettingAdaptor from './adaptor';
import SettingCreator from './creator';

export default {
  name: 'UmisSettings',
  components: {
    ElCard,
    ElSwitch,
    ElTooltip,
    SettingApi,
    SettingStyle,
    SettingAdaptor,
    SettingCreator,
  },
  data() {
    const {
      isApiChanged,
      isFormData,
      style,
      script,
      domains,
      adaptor,
    } = this.$umisConfig;

    return {
      isApiChanged,
      isFormData,
      style,
      script,
      domains,
      adaptor,
    };
  },
  watch: {
    domains: {
      handler(val) {},
    },
  },
  methods: {
    handleFormTypeChange(val) {
      this.$saveInitFormType(this, val);
    },
    handleApiChanged() {
      this.isApiChanged = true;
    },
  },
};
</script>
