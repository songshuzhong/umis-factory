<template>
  <el-card class="umis-setting__card-margin" shadow="hover">
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
</template>
<script>
import {
  Card as ElCard,
  Switch as ElSwitch,
  Tooltip as ElTooltip,
} from 'element-ui';
export default {
  name: 'SettingForm',
  components: {
    ElCard,
    ElSwitch,
    ElTooltip,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFormData: false,
    };
  },
  watch: {
    value: {
      handle(val) {
        this.isFormData = val;
      },
    },
    isFormData(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    handleFormTypeChange(val) {
      this.isFormData = val;
      this.$saveInitFormType(this, val);
      this.$notice({
        type: 'success',
        title: '通知',
        message: '表单类型修改成功',
      });
    },
  },
};
</script>
