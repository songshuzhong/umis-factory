<template>
  <el-alert
    :title="title"
    :type="type"
    :show-icon="showIcon"
    :description="description"
    :closable="closable"
    :center="center"
    :closeText="closeText"
  />
</template>
<script>
import { defineComponent } from 'vue';
import { ElAlert } from 'element-plus';
import mixinProps from '../mixin/props/alert';

export default defineComponent({
  name: 'MisAlert',
  components: {
    ElAlert,
  },
  mixins: [mixinProps]
});
</script>
