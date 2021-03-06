<template>
  <el-dialog
    v-bind="$props"
    class="umis-popup__container"
    :visible.sync="iVisible"
    :title="renderTitle"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnModal"
    :show-close="showClose"
    :appendToBody="appendToBody"
    :destroy-on-close="destroyOnClose"
    @close="onClose"
  >
    <el-main class="umis-popup__container__body">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Object]'"
      >
        <component
          :is="body.renderer"
          :path="`${path}/${body.renderer}`"
          v-bind="body"
          :init-data="data"
        />
      </template>
      <template v-else>
        <template v-for="(item, index) in body">
          <mis-component
            :mis-name="item.renderer"
            :key="`${path}/${index}/${item.renderer}`"
            :path="`${path}/${index}/${item.renderer}`"
            :header="getHeader(item)"
            :body="getBody(item)"
            :footer="getFooter(item)"
            :props="getFattingProps(item)"
            :init-data="getInitData(data, item)"
          />
        </template>
      </template>
    </el-main>
    <div v-if="footer" class="umis-popup__container__footer">
      <template
        v-if="Object.prototype.toString.call(footer) === '[object Array]'"
      >
        <template v-for="(item, index) in footer">
          <mis-component
            :mis-name="item.renderer"
            :key="`${path}/${index}/${item.renderer}`"
            :path="`${path}/${index}/${item.renderer}`"
            :header="getHeader(item)"
            :body="getBody(item)"
            :footer="getFooter(item)"
            :props="getFattingProps(item)"
            :init-data="getInitData(data, item)"
            :after-action="item.closable ? onClose : ''"
          />
        </template>
      </template>
      <template
        v-if="Object.prototype.toString.call(footer) === '[object Object]'"
      >
        <mis-component
          :mis-name="footer.renderer"
          :path="`${path}/${footer.renderer}`"
          :header="getHeader(footer)"
          :body="getBody(footer)"
          :footer="getFooter(footer)"
          :props="getFattingProps(footer)"
          :init-data="getInitData(data, footer)"
          :after-action="footer.closable ? onClose : ''"
        />
      </template>
    </div>
  </el-dialog>
</template>
<script>
import { Dialog as ElDialog, Main as ElMain } from 'element-ui';

import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisDialog',
  components: {
    ElMain,
    ElDialog,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    visible: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: 'Dialog',
    },
    width: {
      type: String,
      required: false,
    },
    fullscreen: {
      type: String,
      required: false,
    },
    modal: {
      type: Boolean,
      required: false,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeOnModal: {
      type: Boolean,
      required: false,
      default: true,
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      required: false,
      default: true,
    },
    header: {
      type: [Array, Object],
      required: false,
    },
    body: {
      type: [Array, Object],
      required: false,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
    classname: {
      type: String,
      required: false,
    },
    onPopupInvisible: {
      type: Function,
      required: false,
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    visible: {
      handler(val) {
        this.iVisible = val;
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    renderTitle() {
      return this.$getRenderedTpl(this.title, this.data);
    },
  },
  data() {
    return {
      iVisible: false,
    };
  },
  mixins: [derivedProp, initData],
  methods: {
    onClose() {
      this.iVisible = false;
      this.onPopupInvisible && this.onPopupInvisible(this.path);
    },
  },
};
</script>
