<template>
  <el-card :shadow="shadow" :body-style="{ padding: 0 }" :class="classname">
    <template v-if="header" slot="header">
      <template
        v-if="Object.prototype.toString.call(header) === '[object Array]'"
      >
        <template v-for="(child, index) in header">
          <mis-component
            :mis-name="child.renderer"
            :key="`${path}/${index}/${child.renderer}`"
            :path="`${path}/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            v-bind="getFattingProps(child)"
            :init-data="data"
          />
        </template>
      </template>
      <mis-component
        v-else
        :mis-name="header.renderer"
        :path="`${path}/${header.renderer}`"
        :body="getBody(header)"
        :header="getHeader(header)"
        :footer="getFooter(header)"
        :props="getFattingProps(header)"
        v-bind="getFattingProps(header)"
        :init-data="data"
      />
    </template>
    <div style="padding: 10px">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(child, index) in body">
          <mis-component
            :mis-name="child.renderer"
            :key="`${path}/${index}/${child.renderer}`"
            :path="`${path}/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            v-bind="getFattingProps(child)"
            :init-data="data"
          />
        </template>
      </template>
      <mis-component
        v-else
        :mis-name="body.renderer"
        :path="`${path}/${body.renderer}`"
        :body="getBody(body)"
        :header="getHeader(body)"
        :footer="getFooter(body)"
        :props="getFattingProps(body)"
        :init-data="data"
        v-bind="getFattingProps(body)"
      />
    </div>
    <div class="el-card__footer" v-if="footer">
      <template
        v-if="Object.prototype.toString.call(footer) === '[object Array]'"
      >
        <template v-for="foot in footer">
          <mis-component
            :mis-name="foot.renderer"
            :key="`${path}/${index}/${foot.renderer}`"
            :path="`${path}/${index}/${foot.renderer}`"
            :header="getHeader(foot)"
            :body="getBody(foot)"
            :footer="getFooter(foot)"
            :props="getFattingProps(foot)"
            :init-data="data"
            v-bind="getFattingProps(foot)"
          />
        </template>
      </template>
      <mis-component
        v-else
        :mis-name="footer.renderer"
        :path="`${path}/${footer.renderer}`"
        :header="getHeader(footer)"
        :body="getBody(footer)"
        :footer="getFooter(footer)"
        :props="getFattingProps(footer)"
        :init-data="data"
        v-bind="getFattingProps(footer)"
      />
    </div>
  </el-card>
</template>

<script>
import { Card as ElCard } from 'element-ui';

import initApi from '../mixin/init-api';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisCard',
  components: {
    ElCard,
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
  },
  mixins: [initApi, initData, derivedProp],
  methods: {
    renderHeader(data) {
      return this.$getRenderedTpl(this.header, data);
    },
  },
};
</script>
