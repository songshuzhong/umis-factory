<template>
  <el-drawer
    v-model="iVisible"
    :appendToBody="appendToBody"
    :closeOnPressEscape="closeOnPressEscape"
    :custom-class="classname"
    :modal="modal"
    :modalAppendToBody="modalAppendToBody"
    :direction="direction"
    :showClose="showClose"
    :size="size"
    :wrapperClosable="wrapperClosable"
    :withHeader="withHeader"
    destroy-on-close
    custom-class="umis-popup__container"
    @close="onClose"
  >
    <template v-if="header" #title>
      <mis-component
        :mis-name="header.renderer"
        :path="`${path}/header/${header.renderer}`"
        :action="onClose"
        :after-action="onClose"
        :props="getFattingProps(header)"
        :header="getHeader(header)"
        :body="getBody(header)"
        :footer="getFooter(header)"
        :init-data="getInitData(data, header)"
      />
    </template>
    <el-main v-if="body" class="umis-popup__container__body">
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(item, index) in body" :key="index">
          <mis-component
            :mis-name="item.renderer"
            :path="`${path}/body/${index}/${item.renderer}`"
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
        :path="`${path}/body/${body.renderer}`"
        :action="onClose"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :init-data="getInitData(data, body)"
      />
    </el-main>
    <div v-if="footer" class="umis-popup__container__footer">
      <template v-for="(item, index) in footer" :key="`${path}/${index}/${item.renderer}`">
        <mis-component
          :mis-name="item.renderer"
          :path="`${path}/footer/${index}/${item.renderer}`"
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
import { defineComponent, ref } from 'vue';
import { ElDrawer, ElMain } from 'element-plus';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/drawer';

export default defineComponent({
  name: 'MisDrawer',
  components: {
    ElMain,
    ElDrawer,
  },
  mixins: [mixinProps, derivedProp, initData],
  setup(props) {
    const iVisible = ref(props.visible);
    const onClose = () => {
      iVisible.value = false;
      props.onPopupInvisible && props.onPopupInvisible(`${props.path}`);
    };

    return {
      iVisible,
      onClose
    };
  }
});
</script>
