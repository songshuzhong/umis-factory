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
          <template #dropdown>
            <el-dropdown-menu>
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
          </template>
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
          <template #dropdown>
            <el-dropdown-menu>
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
          </template>
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
      style="width: 100%"
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
            :align="column.align"
          >
            <template #default="scope">
              <mis-component
                #header
                :path="`${path}/${index}/${column.headSlot.renderer}`"
                :mis-name="column.headSlot.renderer"
                :header="getHeader(column.headSlot)"
                :body="getBody(column.headSlot)"
                :footer="getFooter(column.headSlot)"
                :init-data="scope.row"
                :props="getFattingProps(column.headSlot, scope.row)"
              />
            </template>
            <template v-if="column.body" #default="scope">
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
          >
            <template #default="scope">
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
            :type="column.type"
          />
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="hasPageInfo"
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
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElCheckboxGroup,
  ElCheckbox,
  ElDivider,
} from 'element-plus';
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
      edit: {
        renderer: 'mis-input',
        tip: '唯一名称，字母数字下划线构成'
      }
    },
    title: {
      type: String,
      required: true,
      edit: {
        renderer: 'mis-input',
        tip: '标题'
      }
    },
    columns: {
      type: Array,
      required: true,
      edit: {
        renderer: 'mis-combo',
        multiple: true,
        tip: '表格列',
        controls: [
          {
            renderer: 'mis-input',
            name: 'prop',
            label: '列索引'
          },
          {
            renderer: 'mis-input',
            name: 'label',
            label: '列名'
          }
        ]
      }
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
      edit: {
        renderer: 'mis-input',
        tip: '高度'
      }
    },
    maxHeight: {
      type: Number,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '最大高度'
      }
    },
    stripe: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input',
        tip: '是否为斑马纹 table'
      }
    },
    border: {
      type: Boolean,
      required: false,
      edit: {
        renderer: 'mis-input',
        tip: '是否带有纵向边框'
      }
    },
    fit: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input',
        tip: '列的宽度是否自撑开'
      }
    },
    showDynamicColumn: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    showHeader: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input'
      }
    },
    highlightCurrentRow: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input'
      }
    },
    showExport: {
      type: Boolean,
      required: false,
      default: false,
      edit: {
        renderer: 'mis-input'
      }
    },
    hasPageInfo: {
      type: Boolean,
      required: false,
      default: true,
      edit: {
        renderer: 'mis-input'
      }
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
