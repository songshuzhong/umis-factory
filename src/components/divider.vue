<template>
  <el-divider :direction="direction" :content-position="contentPosition">
    <i v-if="icon" :class="icon" />
    <template v-else>
      {{ renderTitle }}
    </template>
  </el-divider>
</template>

<script>
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { ElDivider } from 'element-plus';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

export default defineComponent({
  name: 'MisDivider',
  components: {
    ElDivider,
  },
  props: {
    path: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
    contentPosition: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  computed: {
    renderTitle() {
    },
  },
  mixins: [initApi],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { data } = useInitApi(props);
    const renderTitle = computed(() => {
      return ctx.$getRenderedTpl(props.text, data);
    });

    return {
      renderTitle
    };
  }
});
</script>
