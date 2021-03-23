<template>
  <el-menu
    ref="menuRef"
    :mode="mode"
    :default-active="defaultActive"
    :collapse="data.collapse"
    :class="data.collapse ? `${classname} umis-menu--collapse` : classname"
    :router="router"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :unique-opened="uniqueOpened"
    @select="handleSelect"
  >
    <template v-if="title">
      <mis-component
        :props="title"
        :mis-name="title.renderer"
        :path="`${path}/${title.renderer}`"
      />
    </template>
    <template v-for="(item, index) in body" :key="index">
      <mis-component
        :path="`${path}/${index}/${item.renderer}`"
        :mis-name="item.renderer"
        :name="item.name"
        :body="item.body"
        :props="item"
        :index="index"
      />
    </template>
  </el-menu>
</template>

<script>
import { defineComponent, onMounted, nextTick, watch, ref, getCurrentInstance } from 'vue';
import { ElMenu } from 'element-plus';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';

export default defineComponent({
  name: 'MisMenu',
  components: {
    ElMenu,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    title: {
      type: [Object, String],
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
    mode: {
      type: String,
      required: false,
      default: 'horizontal',
    },
    defaultActive: {
      type: String,
      required: false,
    },
    router: {
      type: Boolean,
      required: false,
      default: false,
    },
    body: {
      type: Array,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    textColor: {
      type: String,
      required: false,
    },
    activeTextColor: {
      type: String,
      required: false,
    },
    uniqueOpened: {
      type: Boolean,
      required: false,
      default: true,
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
  },
  mixins: [initApi],
  setup(props) {
    const { data } = useInitApi(props);
    const width = ref(0);
    const activeIndex = ref('');
    const menuRef = ref(null);
    const autoWidth = () => {
      nextTick(() => {
        width.value = menuRef.value.$el.clientWidth;
        if (props.target) {
          props.linkageTrigger(props.target, { width: width.value, activeIndex: activeIndex.value });
        }
      });
    };

    watch(data.collapse, val => {
      if (val) {
        props.linkageTrigger(props.target, { width: 64 });
      } else {
        props.linkageTrigger(props.target, { width });
      }
      data.collapse = val;
    });
    onMounted(() => {
      // autoWidth()
    });

    const handleSelect = (index) => {
      activeIndex.value = index;
      autoWidth();
    };

    return {
      data,
      width,
      activeIndex,
      menuRef,
      handleSelect
    };
  },
});
</script>
