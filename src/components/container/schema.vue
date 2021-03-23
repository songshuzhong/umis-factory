<template>
  <div class="umis-schema__container">
    <template v-if="!iSchemaLoading">
      <template
        v-if="Object.prototype.toString.call(iSchema) === '[object Array]'"
      >
        <template v-for="(child, index) in iSchema" :key="index">
          <mis-component
            v-bind="getFattingProps(child)"
            :mis-name="child.renderer"
            :path="`${path}/${index}/${child.renderer}`"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :props="getFattingProps(child, data)"
            :init-data="getInitData(data, child)"
            :visible-on="child.visibleOn"
          />
        </template>
      </template>
      <template
        v-if="Object.prototype.toString.call(iSchema) === '[object Object]'"
      >
        <mis-component
          v-bind="getFattingProps(iSchema)"
          v-if="!iSchemaLoading"
          :mis-name="iSchema.renderer"
          :path="`${path}/${iSchema.renderer}`"
          :header="getHeader(iSchema)"
          :body="getBody(iSchema)"
          :footer="getFooter(iSchema)"
          :props="getFattingProps(iSchema, data)"
          :init-data="getInitData(data, iSchema)"
          :visible-on="iSchema.visibleOn"
        />
      </template>
    </template>
    <el-skeleton v-else :rows="10" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px; margin-bottom: 10px;" />
        <el-skeleton-item variant="p" style="width: 20%" />
        <el-skeleton-item variant="p" style="width: 40%" />
        <el-skeleton-item variant="p" style="width: 60%" />
        <div style="display: flex; align-items: center; justify-items: space-between;">
          <el-skeleton-item variant="text" style="margin-right: 16px;" />
          <el-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script>
import { defineComponent, onMounted, watch, computed, reactive, ref, getCurrentInstance } from 'vue';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';

export default defineComponent({
  name: 'MisSchema',
  components: {
    ElSkeleton,
    ElSkeletonItem
  },
  props: {
    schema: {
      type: [Array, Object],
      required: false,
      default: {}
    },
    canSchemaUpdate: {
      type: Boolean,
      required: false,
      default: true,
    },
    target: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
  },
  setup(props) {
    const { ctx } = getCurrentInstance();
    const iSchemaLoading = ref(false);
    const iStopAutoRefresh = ref(false);
    const isMounted = ref(false);
    const iSchema = ref(props.schema);
    const iUrl = ref(props.url);

    const getPageSchema = () => {
      iSchemaLoading.value = true;
      ctx.$api
        .slientApi(ctx.$umisConfig).get(props.url)
        .then(res => {
          const { pageSchema, ...pageInfo } = res.data;
          const schema = JSON.parse(pageSchema);
          iSchema.value = schema;
          iSchemaLoading.value = false;
          if (props.canSchemaUpdate) {
            window.UMIS = { pageInfo, pageSchema: schema };
          }
        }).catch(err => {
        console.log(err);
      });
    };
    const updatePageSchema = schema => {
      if (props.canSchemaUpdate) {
        iSchemaLoading.value = true;
        const timer = setTimeout(() => {
          iSchema.value = schema;
          iSchemaLoading.value = false;
          window.UMIS.pageSchema = schema;
          clearTimeout(timer);
        }, 200);
      }
    };
    const path = computed(() => {
      if (!props.iProtal) {
        return '';
      }
      return props.canSchemaUpdate ? '' : '/website';
    });

    watch(iUrl, val => {
      if (val) {
        getPageSchema();
      }
    }, {
      deep: true,
      immediate: true
    });

    onMounted(() => {
      isMounted.value = true;
      ctx.$eventHub.$on('mis-schema:change', updatePageSchema);
      if (props.url) {
        getPageSchema();
      }
      if (!props.canSchemaUpdate) {
        ctx.$initSetting(ctx, ctx.$umisConfig);
      }
    });

    return {
      path,
      iSchema,
      iSchemaLoading,
      iStopAutoRefresh,
      isMounted,
      ...useInitApi(props),
      ...useDerivedProp()
    };
  },
  mixins: [initApi],
});
</script>
