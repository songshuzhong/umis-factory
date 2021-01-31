<template>
  <el-submenu
    :index="index + ''"
    :popper-class="popperClass"
    :class="classname"
    :show-timeout="showTimeout"
    :hide-timeout="hideTimeout"
    :disabled="disabled"
    :popper-append-to-body="appendToBody"
  >
    <template v-if="title" #title>
      <i :class="icon" />
      <span>{{ title }}</span>
    </template>
    <template v-for="(item, jndex) in body" :key="jndex">
      <mis-component
        :path="`${path}/${jndex}/${item.renderer}`"
        :mis-name="item.renderer"
        :name="item.name"
        :body="item.body"
        :props="item"
        :index="jndex"
      />
    </template>
  </el-submenu>
</template>

<script>
import { ElSubmenu } from 'element-plus';
import derivedProp from '../mixin/derived-prop';

export default {
  name: 'MisSubmenu',
  components: {
    ElSubmenu,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    index: {
      type: [String, Number],
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    popperClass: {
      type: String,
      required: false,
    },
    showTimeout: {
      type: Number,
      required: false,
      default: 300,
    },
    hideTimeout: {
      type: Number,
      required: false,
      default: 300,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: true
    },
    body: {
      type: Array,
      required: false,
    },
  },
  mixins: [derivedProp],
};
</script>
