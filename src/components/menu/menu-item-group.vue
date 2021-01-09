<template>
  <el-menu-item-group>
    <template v-if="title" slot="title">
      {{ title }}
    </template>
    <template v-for="(item, index) in body" :key="index">
      <mis-component
        :path="`${path}/${index}/${item.renderer}`"
        :mis-name="item.renderer"
        :name="item.name"
        :props="item"
        :header="getHeader(item)"
        :body="getBody(item)"
        :footer="getFooter(item)"
      />
    </template>
  </el-menu-item-group>
</template>

<script>
import { ElMenuItemGroup } from 'element-plus';

import derivedProp from '../mixin/derived-prop';

export default {
  name: 'MisMenuItemGroup',
  components: {
    ElMenuItemGroup,
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
    name: {
      type: String,
      required: false,
    },
    body: {
      type: [Array, Object],
      required: true,
    },
  },
  mixins: [derivedProp],
};
</script>
