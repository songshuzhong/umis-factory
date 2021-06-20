<template>
  <el-page-header @back="handleClick" :content="getContent" />
</template>

<script>
import { defineComponent, computed, getCurrentInstance} from 'vue';
import { useRouter } from 'vue-router';
import { ElPageHeader } from 'element-plus';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
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
  mixins: [initApi],
  setup(props) {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const { data } = useInitApi(props);

    const handleClick = () => {
      router.push(props.url);
    };

    const getContent = computed(() => {
      return proxy.$getRenderedTpl(props.content, data);
    });

    return {
      getContent,
      handleClick
    };
  }
});
</script>
