<template>
  <el-page-header @back="handleClick" :content="getContent" />
</template>

<script>
import { ElPageHeader } from 'element-plus';
import initData from './mixin/init-data';

export default {
  name: 'MisPageHeader',
  components: {
    ElPageHeader,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    getContent() {
      return this.$getRenderedTpl(this.content, this.data);
    },
  },
  mixins: [initData],
  methods: {
    handleClick() {
      this.$router.push(this.url);
    },
  },
};
</script>
