<template>
  <div
    v-if="!iSchemaLoading"
    class="umis-schema__container"
  >
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
    <div v-if="!canSchemaUpdate">
      <template
        v-for="({ actionType, body, data, visible }, path) in popMap"
        :key="path"
      >
        <component
          :is="actionType"
          v-bind="body"
          :path="path"
          :visible="visible"
          :init-data="data"
          :on-popup-invisible="destroyProtal"
        />
      </template>
    </div>
  </div>
  <el-skeleton v-else animated />
</template>
<script>
import { ElSkeleton } from 'element-plus';
import clonedeep from 'lodash.clonedeep';
import derivedProp from '../mixin/derived-prop';
import linkage from '../mixin/linkage';

export default {
  name: 'MisSchema',
  components: {
    ElSkeleton
  },
  props: {
    schema: {
      type: [Array, Object],
      required: false,
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
  data() {
    return {
      iSchemaLoading: false,
      iStopAutoRefresh: false,
      iSchema: {},
      popMap: {},
    };
  },
  watch: {
    schema: {
      handler(val) {
        this.iSchema = val;
      },
      immediate: true,
    },
    url: {
      handler() {
        this.getPageSchema();
      },
      deep: true,
    },
  },
  computed: {
    path() {
      return this.canSchemaUpdate ? this.$route.path : '/website';
    },
  },
  mixins: [derivedProp, linkage],
  mounted() {
    this.isMounted = true;
    this.$eventHub.$on('mis-schema:change', this.updatePageSchema);
    this.$eventHub.$on('mis-portal:create', this.createProtal);
    this.$eventHub.$on('mis-portal:destroy', this.destroyProtal);
    if (this.url) {
      this.getPageSchema();
    }
    if (!this.canSchemaUpdate) {
      this.$initSetting(this, this.$umisConfig);
    }
  },
  methods: {
    createProtal(path, pop) {
      const popMap = this.popMap;
      popMap[path] = pop;
      this.popMap = clonedeep(popMap);
    },
    destroyProtal(path) {
      const popMap = this.popMap;
      delete popMap[path];
      this.popMap = clonedeep(popMap);
    },
    getPageSchema() {
      this.iSchemaLoading = true;
      this.$api
        .slientApi(this.$umisConfig).get(this.url)
        .then(res => {
          const { pageSchema, ...pageInfo } = res.data;
          const schema = JSON.parse(pageSchema);
          this.iSchema = schema;
          this.iSchemaLoading = false;
          this.onLinkageTrigger(this.target, {url: this.url});
          window.UMIS = { pageInfo, pageSchema: schema };
        }).catch(err => {
          console.log(err);
      });
    },
    updatePageSchema(schema) {
      if (this.canSchemaUpdate) {
        this.iSchemaLoading = true;
        const timer = setTimeout(() => {
          this.iSchema = schema;
          this.iSchemaLoading = false;
          window.UMIS.pageSchema = schema;
          clearTimeout(timer);
        }, 200);
      }
    },
  },
};
</script>
