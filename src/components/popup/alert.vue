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
import { ElAlert } from 'element-plus';

export default {
  name: 'MisAlert',
  components: {
    ElAlert,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title',
      desc: '标题'
    },
    type: {
      type: String,
      required: false,
      default: 'success',
      desc: '主体'
    },
    showIcon: {
      type: Boolean,
      required: false,
      default: false,
      desc: '是否显示图标'
    },
    description: {
      type: String,
      required: false,
      default: 'Description',
      desc: '辅助性文字'
    },
    closable: {
      type: Boolean,
      required: false,
      default: false,
      desc: '是否可关闭'
    },
    center: {
      type: Boolean,
      required: false,
      default: false,
      desc: '文字是否居中'
    },
    closeText: {
      type: String,
      required: false,
      default: '关闭',
      desc: '关闭按钮自定义文本'
    },
    classname: {
      type: String,
      required: false,
      default: '',
      desc: '自定义样式类名'
    },
  },
};
</script>
