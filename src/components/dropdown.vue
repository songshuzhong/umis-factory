<template>
  <el-dropdown>
    <el-button
      :size="size"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
    >
      {{ text }}
      <i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in body"
          :key="index"
          :command="index"
          :disabled="item.disabled"
          :divided="item.divided"
          :icon="item.icon"
        >
          <mis-component
            v-if="actionItems.includes(item.actionType)"
            :path="`/${path}/${index}/${item.renderer}`"
            :mis-name="item.renderer"
            :props="getFattingProps(item)"
            :init-data="getInitData(data, item)"
          />
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

import useDerivedProp from './mixin/useDerivedProp';
import useInitApi from './mixin/useInitApi';
import initApi from './mixin/props/init-api';

const actionItems = ['mis-ajax', 'mis-copy', 'mis-redirect', 'mis-url'];

export default defineComponent({
  name: 'MisDropdown',
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    plain: {
      type: Boolean,
      required: false,
    },
    round: {
      type: Boolean,
      required: false,
    },
    circle: {
      type: Boolean,
      required: false,
    },
  },
  mixins: [initApi],
  setup(props) {
    return {
      actionItems,
      ...useDerivedProp(),
      ...useInitApi(props)
    };
  }
});
</script>
