<template>
  <el-drawer
    class="umis-popup__container"
    :appendToBody="appendToBody"
    :closeOnPressEscape="closeOnPressEscape"
    :custom-class="classname"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :direction="direction"
    :showClose="showClose"
    :size="size"
    :visible.sync="iVisible"
    :wrapperClosable="wrapperClosable"
    :withHeader="withHeader"
    destroy-on-close
    @close="onClose"
  >
    <template v-if="header" slot="title">
      <mis-component
        :mis-name="header.renderer"
        :path="`${path}/${header.renderer}`"
        :action="onClose"
        :after-action="onClose"
        :props="getFattingProps(header)"
        :header="getHeader(header)"
        :body="getBody(header)"
        :footer="getFooter(header)"
        :init-data="getInitData(data, header)"
      />
    </template>
    <el-main class="umis-popup__container__body">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(item, index) in body">
          <mis-component
            :mis-name="item.renderer"
            :key="index"
            :path="`${path}/${index}/${item.renderer}`"
            :footer="item.footer"
            :action="onClose"
            :props="getFattingProps(item)"
            :header="getHeader(item)"
            :body="getBody(item)"
            :footer="getFooter(item)"
            :init-data="getInitData(data, item)"
          />
        </template>
      </template>
      <mis-component
        v-else
        :mis-name="body.renderer"
        :path="`${path}/${body.renderer}`"
        :footer="body.footer"
        :action="onClose"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :init-data="getInitData(data, body)"
      />
    </el-main>
    <div v-if="footer" class="umis-popup__container__footer">
      <template v-for="(item, index) in footer">
        <mis-component
          :mis-name="item.renderer"
          :key="`${path}/${index}/${item.renderer}`"
          :path="`${path}/${index}/${item.renderer}`"
          :footer="item.footer"
          :props="getFattingProps(item)"
          :init-data="getInitData(data, item)"
          :after-action="item.closable ? onClose : ''"
          :action="onClose"
        />
      </template>
    </div>
  </el-drawer>
</template>
<script>
import { Drawer as ElDrawer, Main as ElMain } from 'element-ui';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisDrawer',
  components: {
    ElMain,
    ElDrawer,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    appendToBody: {
      type: Boolean,
      required: false,
      default: false,
    },
    beforeClose: {
      type: Function,
      required: false,
    },
    closeOnPressEscape: {
      type: Boolean,
      required: false,
      default: true,
    },
    classname: {
      type: String,
      required: false,
    },
    modal: {
      type: Boolean,
      required: false,
      default: true,
    },
    modalAppendToBody: {
      type: Boolean,
      required: false,
      default: true,
    },
    direction: {
      type: String,
      required: false,
      options: ['rtl', 'ltr', 'ttb', 'btt'],
      default: 'rtl',
    },
    showClose: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: [String, Number],
      required: false,
      default: '30%',
    },
    header: {
      type: [String, Object],
      required: false,
    },
    visible: {
      type: Boolean,
      required: false,
    },
    wrapperClosable: {
      type: Boolean,
      required: false,
    },
    withHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: [Array, Object],
      required: true,
    },
    footer: {
      type: [Array, Object],
      required: false,
    },
    onPopupInvisible: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      iVisible: false,
    };
  },
  mixins: [derivedProp, initData],
  watch: {
    visible: {
      handler(val) {
        this.iVisible = val;
      },
      immediate: true,
    },
  },
  methods: {
    onClose() {
      this.iVisible = false;
      this.onPopupInvisible && this.onPopupInvisible(this.path);
    },
  },
};
</script>
