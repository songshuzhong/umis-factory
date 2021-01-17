<template>
  <el-card class="umis-setting__card-margin" shadow="hover">
    <template #header>
      <div>
        <el-tooltip content="全局数据提交类型" placement="top-start">
          <span>表单类型 <i class="el-icon-info" /> </span>
        </el-tooltip>
      </div>
    </template>
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
  ElCard,
  ElSwitch,
  ElTooltip,
} from 'element-plus';
export default {
  name: 'SettingFormdata',
  components: {
    ElCard,
    ElSwitch,
    ElTooltip,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isFormData: this.value,
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        this.isFormData = val;
      },
      immediate: true,
      deep: true,
    },
    isFormData: {
      handler(val) {
        this.$emit('update:modelValue', val);
      },
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
