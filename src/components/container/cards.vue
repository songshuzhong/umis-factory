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
import { defineComponent, reactive, getCurrentInstance } from 'vue';
import { ElRow, ElCol, ElCard, ElPagination } from 'element-plus';
import MisCard from './card';
import useInitApi from '../mixin/useInitApi';
import useDerivedProp from '../mixin/useDerivedProp';
import mixinProps from '../mixin/props/cards';
import initApi from '../mixin/props/init-api';

export default defineComponent({
  name: 'MisCards',
  components: {
    MisCard,
    ElRow,
    ElCol,
    ElCard,
    ElPagination,
  },
  mixins: [mixinProps, initApi],
  setup(props) {
    const { proxy } = getCurrentInstance();
    const iBody = reactive(props.body);
    const renderHeader = (data) => proxy.$getRenderedTpl(props.header, data);

    return {
      iBody,
      renderHeader,
      ...useInitApi(props),
      ...useDerivedProp()
    };
  },
});
</script>
