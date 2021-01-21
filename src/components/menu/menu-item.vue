<template>
  <el-menu-item :name="name" :index="name">
    <i v-if="icon" :class="icon" />
    <template #title>
      {{ title }}
    </template>
  </el-menu-item>
</template>

<script>
import { ElMenuItem } from 'element-plus';

export default {
  name: 'MisMenuItem',
  components: {
    ElMenuItem,
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    index: {
      type: [String, Number],
      required: true,
    },
    path: {
      type: String,
      required: false,
    },
  },
};
</script>
