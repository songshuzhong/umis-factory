<template>
  <el-menu-item :name="name" :index="name">
    <template v-if="icon">
      <i :class="icon" />
      <span slot="title">{{ title }}</span>
    </template>
    <template v-else>
      {{ label }}
    </template>
  </el-menu-item>
</template>

<script>
import { MenuItem as ElMenuItem } from 'element-ui';

export default {
  name: 'MisMenuItem',
  components: {
    ElMenuItem,
  },
  props: {
    label: {
      type: String,
      required: false,
    },
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
    path: {
      type: String,
      required: false,
    },
  },
};
</script>
