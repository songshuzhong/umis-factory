<template>
  <el-submenu
    :index="path"
    :popper-class="popperClass"
    :class="classname"
    :show-timeout="showTimeout"
    :hide-timeout="hideTimeout"
    :disabled="disabled"
    :popper-append-to-body="appendToBody"
  >
    <template v-if="title" slot="title">
      <i :class="icon" />
      <span slot="title">{{ title }}</span>
    </template>
    <template v-for="(item, index) in body">
      <mis-component
        :path="`${path}/${index}/${item.renderer}`"
        :mis-name="item.renderer"
        :key="index"
        :name="item.name"
        :body="item.body"
        :props="item"
      />
    </template>
  </el-submenu>
</template>

<script>
import { Submenu as ElSubmenu } from 'element-ui';
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
      type: String,
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
    },
    body: {
      type: Array,
      required: false,
    },
  },
  mixins: [derivedProp],
};
</script>
