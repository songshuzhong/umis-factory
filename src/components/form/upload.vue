<template>
  <el-upload :action="action" :on-change="handleChange" :file-list="fileList">
    <el-button size="small" type="primary">
      点击上传
    </el-button>
    <div slot="tip">
      {{ tip }}
    </div>
  </el-upload>
</template>

<script>
import {Upload as ElUpload} from 'element-ui';
import {Button as ElButton} from 'element-ui';

export default {
  name: 'MisUpload',
  components: {
    ElUpload,
    ElButton,
  },
  props: {
    action: {
      type: String,
      required: true,
    },
    tip: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handlePreview() {},
    handleRemove() {},
    submitUpload() {},
  },
};
</script>
