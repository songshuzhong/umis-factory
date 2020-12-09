<template>
  <el-collapse v-model="data.value" :accordion="accordion">
    <template v-for="(item, index) in body" :key="`${path}/${index}`">
      <el-collapse-item
        :name="item.name"
        :title="item.title"
        :disabled="item.disabled"
      >
        <mis-component
          :mis-name="item.renderer"
          :path="`${path}/${index}/${item.renderer}`"
          :body="getBody(item)"
          :header="getHeader(item)"
          :footer="getFooter(item)"
          :props="getFattingProps(item)"
          :init-data="getInitData(data, item)"
        />
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script>
import { ElCollapse, ElCollapseItem } from 'element-plus';
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';

export default {
  name: 'MisCollapse',
  components: {
    ElCollapse,
    ElCollapseItem,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    accordion: {
      type: Boolean,
      required: false,
      default: true,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  watch: {
    value: {
      handler(val) {
        this.data.value = val;
      },
    },
  },
  mixins: [initData, derivedProp],
};
</script>
