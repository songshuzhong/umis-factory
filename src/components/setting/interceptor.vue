<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header">
      <span>接口拦截器</span>
    </div>
  </el-card>
</template>

<script>
import {Card as ElCard} from 'element-ui';
import {ButtonGroup as ElButtonGroup} from 'element-ui';
import {Button as ElButton} from 'element-ui';

export default {
  name: 'SettingInterceptor',
  components: {
    ElCard,
    ElButtonGroup,
    ElButton,
  },
};
</script>
