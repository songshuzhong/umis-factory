<template>
  <div class="umis-crud__container">
    <el-row v-loading="iApiLoading" :gutter="gutter">
      <el-col
        v-for="(item, index) in rows"
        :span="span"
        :key="`${path}/${index}`"
        :xs="size[0]"
        :sm="size[1]"
        :md="size[2]"
        :lg="size[3]"
      >
        <mis-card
          :path="`${path}/${index}`"
          :classname="classname"
          :shadow="shadow"
          :body-style="bodyStyle"
          :header="header"
          :body="body"
          :footer="footer"
          :actions="actions"
          :action="action"
          :init-data="item"
        />
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next, total, sizes, jumper"
      :total="iTotal"
      :page-size="iPageSize"
      :current-page="iPageIndex"
      :page-sizes="[10, 20, 30, 40]"
      @current-change="handlePageChanged"
      @size-change="handlePageSizeChanged"
    />
  </div>
</template>
<script>
import {
  Row as ElRow,
  Col as ElCol,
  Card as ElCard,
  Pagination as ElPagination,
} from 'element-ui';

import MisCard from './card';
import initApi from '../mixin/init-api';
import derivedProp from '../mixin/derived-prop';
import pageInfo from '../mixin/page-info';

export default {
  name: 'MisCards',
  components: {
    MisCard,
    ElRow,
    ElCol,
    ElCard,
    ElPagination,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    header: {
      type: String,
      required: false,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
    initApi: {
      type: [String, Object],
      required: false,
    },
    actions: {
      type: Object,
      required: false,
    },
    action: {
      type: Function,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    bodyStyle: {
      type: Object,
      required: false,
    },
    shadow: {
      type: String,
      required: false,
      options: ['always', 'hover', 'never'],
      default: 'always',
    },
    gutter: {
      type: Number,
      required: false,
      default: 0,
    },
    span: {
      type: Number,
      required: false,
      default: 12,
    },
    size: {
      type: Array,
      required: false,
      default: [24, 12, 8, 4],
    },
  },
  mixins: [initApi, derivedProp, pageInfo],
  watch: {
    body: {
      handler(val) {
        this.iBody = val;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    renderHeader(data) {
      return this.$getRenderedTpl(this.header, data);
    },
  },
};
</script>
