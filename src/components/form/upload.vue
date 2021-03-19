<template>
  <el-upload
    :action="action"
    :on-change="handleChange"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">
      点击上传
    </el-button>
    <template #tip>
      {{ tip }}
    </template>
  </el-upload>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { ElUpload, ElButton } from 'element-plus';

export default defineComponent({
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
  setup() {
    const fileList = reactive([]);
    const handleChange = (file, fileList) => {
      fileList.value = fileList.slice(-3);
    };
    return {
      fileList,
      handleChange
    };
  },
});
</script>
