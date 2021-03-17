<template>
  <div class="umis-crud__container">
    <el-row v-loading="iApiLoading" :gutter="gutter">
      <el-col
        v-for="(item, index) in rows"
        :span="span"
        :key="`${path}/${index}`"
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
      v-if="hasPageInfo"
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
import { ElRow, ElCol, ElCard, ElPagination } from 'element-plus';
import MisCard from './card';
import initApi from '../mixin/init-api';
import derivedProp from '../mixin/derived-prop';
import pageInfo from '../mixin/page-info';
import mixinProps from '../mixin/props/cards';

export default {
  name: 'MisCards',
  components: {
    MisCard,
    ElRow,
    ElCol,
    ElCard,
    ElPagination,
  },
  mixins: [mixinProps, initApi, derivedProp, pageInfo],
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
