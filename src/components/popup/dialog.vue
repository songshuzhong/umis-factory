<template>
  <el-dialog
    v-model="iVisible"
    v-bind="$props"
    :title="renderTitle"
    :width="width"
    :fullscreen="fullscreen"
    :modal="modal"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnModal"
    :show-close="showClose"
    :appendToBody="appendToBody"
    :destroy-on-close="destroyOnClose"
    custom-class="umis-popup__container"
    @close="onClose"
  >
    <el-main v-if="body" class="umis-popup__container__body">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Object]'"
      >
        <component
          :is="body.renderer"
          :path="`${path}/body/${body.renderer}`"
          v-bind="body"
          :init-data="data"
        />
      </template>
      <template v-else>
        <template v-for="(item, index) in body" :key="`${path}/${index}/${item.renderer}`">
          <mis-component
            :mis-name="item.renderer"
            :path="`${path}/body/${index}/${item.renderer}`"
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
        <template v-for="(item, index) in footer" :key="`${path}/${index}/${item.renderer}`">
          <mis-component
            :path="`${path}/footer/${index}/${item.renderer}`"
            :mis-name="item.renderer"
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
          :path="`${path}/footer/${footer.renderer}`"
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
import { defineComponent, computed, ref, getCurrentInstance } from 'vue';
import { ElDialog, ElMain } from 'element-plus';

import useDerivedProp from '../mixin/useDerivedProp';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/dialog';

export default defineComponent({
  name: 'MisDialog',
  components: {
    ElMain,
    ElDialog,
  },
  mixins: [mixinProps, initData],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const iVisible = ref(props.visible);
    const onClose = () => {
      iVisible.value = false;
      props.onPopupInvisible && props.onPopupInvisible(props.path);
    };
    const renderTitle = computed(() => {
      return ctx.$getRenderedTpl(props.title, props.initData);
    });

    return {
      iVisible,
      renderTitle,
      onClose,
      ...useDerivedProp()
    };
  }
});
</script>
