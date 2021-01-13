<template>
  <el-card
    :shadow="shadow"
    :body-style="bodyStyle"
    :class="classname"
    @click.native="handleClick"
  >
    <template v-if="header" #header>
      <template
        v-if="Object.prototype.toString.call(header) === '[object Array]'"
      >
        <template v-for="(child, index) in header" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :init-data="getInitData(data, child)"
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
        :init-data="getInitData(data, header)"
      />
    </template>
    <div style="padding: 10px">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :init-data="getInitData(data, child)"
          />
        </template>
      </template>
      <mis-component
        v-else
        :mis-name="body.renderer"
        :path="`${path}/${body.renderer}`"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :init-data="getInitData(data, body)"
      />
    </div>
    <div class="el-card__footer" v-if="footer">
      <template
        v-if="Object.prototype.toString.call(footer) === '[object Array]'"
      >
        <template v-for="(child, index) in footer" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/${index}/${child.renderer}`"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :props="getFattingProps(child)"
            :init-data="getInitData(data, child)"
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
        :init-data="getInitData(data, footer)"
      />
    </div>
  </el-card>
</template>

<script>
import { ElCard } from 'element-plus';

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
    actions: {
      type: Object,
      required: false,
    },
    action: {
      type: Function,
      required: true,
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
      default: { padding: 0 },
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
    handleClick() {
      if (this.actions) {
        if (Object.prototype.toString.call(this.actions) === '[object Array]') {
          let props = this.actions.find(item => {
            if (
              item.actionOn &&
              this.$onExpressionEval(item.actionOn, this.data)
            ) {
              return item;
            }
          });
          this.actions && this.action(props, this.data);
        } else {
          this.actions && this.action(this.actions, this.data);
        }
      }
    },
  },
};
</script>
