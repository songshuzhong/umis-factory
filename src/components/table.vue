<template>
  <div class="umis-crud__container">
    <div
      v-if="showDynamicColumn || showExport || actions"
      class="umis-crud__container__header"
      :class="{ border: border }"
    >
      <div class="umis-crud__container__title">
        {{ title }}
      </div>
      <div class="umis-crud__container__tools">
        <el-dropdown
          v-if="showDynamicColumn"
          class="umis-crud__container__tool"
          size="mini"
          split-button
          placement="bottom-start"
        >
          <i class="el-icon-s-grid" />
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group v-model="dynamicColumn">
              <template v-for="(column, index) in columns">
                <el-dropdown-item v-if="column.name" :key="index">
                  <el-checkbox :label="column.name">
                    {{ column.label }}
                  </el-checkbox>
                </el-dropdown-item>
              </template>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          v-if="actions"
          class="umis-crud__container__tool"
          size="mini"
          split-button
          trigger="click"
          placement="bottom-start"
        >
          <i class="el-icon-shopping-cart-full" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in actions"
              :key="`${path}/${index}`"
            >
              <mis-component
                :path="`${path}/${index}/${item.renderer}`"
                :mis-name="item.renderer"
                :props="getFattingProps(item)"
                :init-data="multipleSelection"
                :disabled-on="`${multipleSelection.length} === 0`"
                :action="action"
              />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-if="showExport"
          class="umis-crud__container__tool"
          size="mini"
          icon="el-icon-download"
          @click="handleExportExcel"
        >
          导出
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="iApiLoading"
      ref="table"
      :data="rows"
      :height="height"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :max-height="maxHeight"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(column, index) in columns">
        <template v-if="!dynamicColumn.includes(column.name)">
          <el-table-column
            v-if="column.headSlot"
            :path="`${path}/${index}/${column.name}`"
            :key="`${path}/${index}/${column.name}`"
            :prop="column.name || ''"
            :label="column.label"
            :fixed="column.fixed"
            :width="column.width"
            :align="column.align"
          >
            <template slot="header" slot-scope="scope">
              <mis-component
                :path="`${path}/${index}/${column.headSlot.renderer}`"
                :mis-name="column.headSlot.renderer"
                :header="getHeader(column.headSlot)"
                :body="getBody(column.headSlot)"
                :footer="getFooter(column.headSlot)"
                :init-data="scope.row"
                :props="getFattingProps(column.headSlot, scope.row)"
              />
            </template>
            <template v-if="column.body" slot-scope="scope">
              <mis-component
                :path="`${path}/${index}/${column.body.renderer}`"
                :mis-name="column.body.renderer"
                :header="getHeader(column.body)"
                :body="getBody(column.body)"
                :footer="getFooter(column.body)"
                :init-data="scope.row"
                :props="getFattingProps(column.body)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="!column.headSlot && column.body"
            :path="`${path}/${index}/${column.name}`"
            :prop="column.name || ''"
            :label="column.label"
            :width="column.width"
          >
            <template slot-scope="scope">
              <template
                v-if="
                  Object.prototype.toString.call(column.body) ===
                    '[object Array]'
                "
              >
                <template v-for="(item, jndex) in column.body" :key="jndex">
                  <mis-component
                    :path="`${path}/${index}/${item.renderer}`"
                    :mis-name="item.renderer"
                    :header="getHeader(item)"
                    :body="getBody(item)"
                    :footer="getFooter(item)"
                    :init-data="scope.row"
                    :props="getFattingProps(item, scope.row)"
                  />
                </template>
              </template>
              <mis-component
                v-else
                :path="`${path}/${column.body.renderer}`"
                :mis-name="column.body.renderer"
                :header="getHeader(column.body)"
                :body="getBody(column.body)"
                :footer="getFooter(column.body)"
                :init-data="scope.row"
                :props="getFattingProps(column.body, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :path="`${path}/${index}/${column.name}`"
            :prop="column.name || ''"
            :label="column.label"
            :fixed="column.fixed"
            :width="column.width"
            :type="column.type"
          />
        </template>
      </template>
    </el-table>
    <el-pagination
      class="umis-crud__container__pagination"
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
  Table as ElTable,
  TableColumn as ElTableColumn,
  Pagination as ElPagination,
  Dropdown as ElDropdown,
  DropdownMenu as ElDropdownMenu,
  DropdownItem as ElDropdownItem,
  CheckboxGroup as ElCheckboxGroup,
  Checkbox as ElCheckbox,
  Divider as ElDivider,
} from 'element-ui';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

import initApi from './mixin/init-api';
import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';
import pageInfo from './mixin/page-info';

export default {
  name: 'MisTable',
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElCheckboxGroup,
    ElCheckbox,
    ElDivider,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      required: false,
    },
    action: {
      type: Function,
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
    showDynamicColumn: {
      type: Boolean,
      required: false,
      default: false,
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
    showExport: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      dynamicColumn: [],
      multipleSelection: [],
    };
  },
  mixins: [initData, initApi, derivedProp, pageInfo],
  methods: {
    handleSelectionChange(val) {
      const selectedIds = val.map(item => item.id);
      this.multipleSelection = { selectedIds };
    },
    handleExportExcel() {
      const dom = this.$refs.table.$el.querySelector('.el-table__fixed');
      const wb = XLSX.utils.table_to_book(dom);
      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
        bookSST: true,
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          'sheetjs.xlsx'
        );
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }
      return wbout;
    },
  },
};
</script>
