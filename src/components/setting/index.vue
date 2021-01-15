<template>
  <div v-resize class="umis-setting__container" @resize="handleResize">
    <div class="umis-setting__container__body">
      <setting-formdata v-model="isFormData" />
      <setting-api v-model="domains" :on-api-changed="handleApiChanged" />
      <setting-adaptor v-model="adaptor" ref="adaptor" />
      <setting-style v-model="style" ref="style" />
    </div>
    <div
      class="umis-setting__container__footer"
      :class="{ fixed: fixed }"
      :style="{ width: `${elasticWidth}px` }"
    >
      <el-popconfirm title="确定保存到数据库吗？" @confirm="handleSaveRemote">
        <template #reference>
          <el-button plain size="mini" type="primary">
            保存
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
<script>
import { ElButton, ElPopconfirm } from 'element-plus';

import SettingApi from './api';
import SettingStyle from './style';
import SettingAdaptor from './adaptor';
import SettingFormdata from './formdata';

export default {
  name: 'UmisSettings',
  components: {
    ElButton,
    ElPopconfirm,
    SettingFormdata,
    SettingApi,
    SettingStyle,
    SettingAdaptor,
  },
  data() {
    const {
      isApiChanged,
      isFormData,
      style,
      domains,
      adaptor,
    } = window.umisConfig;
    return {
      isApiChanged,
      isFormData,
      style,
      domains,
      adaptor,
      elasticWidth: 0,
      fixed: true,
    };
  },
  mounted() {
    this.$eventHub.$on('mis-config:update', this.updateUmisConfig);
    this.body = document.querySelector('.umis-setting__container__body');
    this.container = document.querySelector('.umis-layout__container__main');
    this.container.addEventListener('scroll', this.handleScrolling);
  },
  methods: {
    updateUmisConfig(config) {
      this.isFormData = config.isFormData;
      this.style = config.groupStyle;
      this.adaptor = config.groupAdaptor;
    },
    handleScrolling() {
      const clientHeight = document.body.clientHeight;
      const offsetHeight = this.body.offsetHeight;
      // 60 + 44 + 20
      if (clientHeight + this.container.scrollTop > offsetHeight + 124) {
        this.fixed = false;
      } else {
        this.fixed = true;
      }
    },
    handleApiChanged() {
      this.isApiChanged = true;
    },
    handleSaveRemote() {
      const umisConfig = {
        isFormData: this.isFormData,
        groupStyle: this.style,
        groupAdaptor: this.adaptor,
        groupDomain: this.$umisConfig.VUE_APP_API_ACTIVE,
        groupId: '0767bea4-c7e7-4aa7-a1b5-2fd5e1ec4a7f',
      };
      this.$api
        .slientApi(this.$umisConfig)
        .put('/api/group', umisConfig)
        .then(res => {
          this.$message({
            message: res.msg,
            showClose: true,
            type: 'success',
          });
        });
    },
    handleResize(e) {
      this.elasticWidth = e.detail.width;
    },
  },
};
</script>
