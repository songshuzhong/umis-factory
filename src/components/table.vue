<template>
  <div class="umis-crud__container">
    <el-table
      v-loading="iApiLoading"
      :data="rows"
      :height="height"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :max-height="maxHeight"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
    >
      <template v-for="(column, index) in columns" :key="index">
        <el-table-column
          v-if="column.body"
          :path="`/${path}/${index}/${column.name}`"
          :prop="column.name || ''"
          :label="column.label"
          :width="column.width"
        >
          <template slot-scope="scope">
            <template v-for="(item, jndex) in column.body" :key="jndex">
              <mis-component
                :path="`/${path}/${index}/${item.renderer}`"
                :mis-name="item.renderer"
                :header="getHeader(item)"
                :body="getBody(item)"
                :footer="getFooter(item)"
                :init-data="scope.row"
                :props="getFattingProps(item, scope.row)"
              />
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :path="`/${path}/${index}/${column.name}`"
          :prop="column.name || ''"
          :label="column.label"
          :fixed="column.fixed"
          :width="column.width"
        />
      </template>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, total, sizes, jumper"
      :total="iTotal"
      :page-size="iPageSize"
      :current-page="iPageIndex"
      :page-sizes="[10, 20, 30, 40]"
      @current-change="handlePageChanged"
    />
  </div>
</template>

<script>
import {Table as ElTable} from 'element-ui';
import {TableColumn as ElTableColumn} from 'element-ui';
import {Pagination as ElPagination} from 'element-ui';

import initApi from './mixin/initApi';
import derivedProp from './mixin/derivedProp';
import initData from './mixin/initData';

export default {
  name: 'MisTable',
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    height: {
      type: Number,
      required: false,
    },
    maxHeight: {
      type: Number,
      required: false,
    },
    stripe: {
      type: Boolean,
      required: false,
      default: true,
    },
    border: {
      type: Boolean,
      required: false,
    },
    fit: {
      type: Boolean,
      required: false,
      default: true,
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  mixins: [initData, initApi, derivedProp],
};
</script>
