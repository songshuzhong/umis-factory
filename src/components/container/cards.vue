<template>
  <div class="umis-crud__container">
    <el-row v-loading="iApiLoading" :gutter="gutter">
      <el-col
        v-for="(item, index) in rows"
        :span="span"
        :key="index"
        :xs="size[0]"
        :sm="size[1]"
        :md="size[2]"
        :lg="size[3]"
      >
        <mis-card
          :path="`${path}/${index}`"
          :classname="classname"
          :body-style="bodyStyle"
          :header="header"
          :body="body"
          :footer="footer"
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
      @size-change="handleSizeChanged"
      @current-change="handlePageChanged"
    />
  </div>
</template>
<script>
import { Row as ElRow } from 'element-ui';
import { Col as ElCol } from 'element-ui';
import { Card as ElCard } from 'element-ui';
import { Pagination as ElPagination } from 'element-ui';

import initApi from '../mixin/initApi';
import derivedProp from '../mixin/derivedProp';
import MisCard from './card';

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
  mixins: [initApi, derivedProp],
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
