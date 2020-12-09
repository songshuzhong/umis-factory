<template>
  <div class="umis-setting__cards">
    <el-card class="umis-setting__card-margin">
      <div slot="header">
        <span>表单类型</span>
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
    <setting-interceptor />
    <setting-style v-model="style" />
  </div>
</template>
<script>
import { ElCard, ElSwitch } from 'element-plus';

import SettingApi from './api';
import SettingStyle from './style';
import SettingInterceptor from './interceptor';
import SettingCreator from './creator';

export default {
  name: 'UmisSettings',
  components: {
    ElCard,
    ElSwitch,
    SettingApi,
    SettingStyle,
    SettingInterceptor,
    SettingCreator,
  },
  data() {
    const {
      isApiChanged,
      isFormData,
      style,
      script,
      domains,
    } = this.$umisConfig;

    return {
      isApiChanged,
      isFormData,
      style,
      script,
      domains,
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

<style lang="scss">
.umis-setting__cards {
  .umis-setting__card-margin {
    margin: 10px 0;
  }
  .umis-setting__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
