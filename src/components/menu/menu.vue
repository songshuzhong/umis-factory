<template>
  <el-menu
    ref="menu"
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
import { ElMenu } from 'element-plus';
import initData from '../mixin/init-data';

export default {
  name: 'MisMenu',
  components: {
    ElMenu,
  },
  props: {
    name: {
      type: String,
      required: true,
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
  data() {
    return {
      data: {
        collapse: false,
      },
      width: 0,
      activeIndex: '',
    };
  },
  watch: {
    'data.collapse': {
      handler(val) {
        if (val) {
          this.linkageTrigger(this.target, { width: 64 });
        } else {
          this.linkageTrigger(this.target, { width: this.width });
        }
        this.data.collapse = val;
      },
      immediate: true,
    },
    activeIndex: {
      handler(val) {
        this.linkageTrigger(this.target, { activeIndex: val });
      }
    }
  },
  mixins: [initData],
  mounted() {
    this.$nextTick(() => {
      this.width = this.$refs.menu.$el.clientWidth;
      if (this.target) {
        this.linkageTrigger(this.target, { width: this.width });
      }
    });
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    }
  }
};
</script>
