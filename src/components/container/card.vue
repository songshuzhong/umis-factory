<template>
  <el-card
    :shadow="shadow"
    :body-style="bodyStyle"
    :class="`umis-card ${classname}`"
    @click.native="handleClick"
  >
    <template v-if="header" #header>
      <template
        v-if="Object.prototype.toString.call(header) === '[object Array]'"
      >
        <template v-for="(child, index) in header" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/header/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :init-data="getInitData(data, child)"
          />
        </template>
      </template>
      <mis-component
        v-else-if="Object.prototype.toString.call(header) === '[object Object]'"
        :mis-name="header.renderer"
        :path="`${path}/header/${header.renderer}`"
        :body="getBody(header)"
        :header="getHeader(header)"
        :footer="getFooter(header)"
        :props="getFattingProps(header)"
        :init-data="getInitData(data, header)"
      />
      <template v-else-if="Object.prototype.toString.call(header) === '[object String]'">
        {{header}}
      </template>
    </template>
    <div
      v-if="body"
      class="umis-card__body"
      drop-position="body"
      @dragover="dragOver"
      @drop="drop"
    >
      <template
        v-if="Object.prototype.toString.call(body) === '[object Array]'"
      >
        <template v-for="(child, index) in body" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/body/${index}/${child.renderer}`"
            :props="getFattingProps(child)"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :init-data="getInitData(data, child)"
          />
        </template>
      </template>
      <mis-component
        v-else-if="Object.prototype.toString.call(header) === '[object Object]'"
        :mis-name="body.renderer"
        :path="`${path}/body/${body.renderer}`"
        :props="getFattingProps(body)"
        :header="getHeader(body)"
        :body="getBody(body)"
        :footer="getFooter(body)"
        :init-data="getInitData(data, body)"
      />
      <template v-else-if="Object.prototype.toString.call(header) === '[object String]'">
        {{body}}
      </template>
    </div>
    <div
      v-if="footer"
      class="umis-card__footer"
      drop-position="footer"
      @dragover="dragOver"
      @drop="drop"
    >
      <template
        v-if="Object.prototype.toString.call(footer) === '[object Array]'"
      >
        <template v-for="(child, index) in footer" :key="`${path}/${index}/${child.renderer}`">
          <mis-component
            :mis-name="child.renderer"
            :path="`${path}/footer/${index}/${child.renderer}`"
            :header="getHeader(child)"
            :body="getBody(child)"
            :footer="getFooter(child)"
            :props="getFattingProps(child)"
            :init-data="getInitData(data, child)"
          />
        </template>
      </template>
      <mis-component
        v-else-if="Object.prototype.toString.call(footer) === '[object Object]'"
        :mis-name="footer.renderer"
        :path="`${path}/footer/${footer.renderer}`"
        :header="getHeader(footer)"
        :body="getBody(footer)"
        :footer="getFooter(footer)"
        :props="getFattingProps(footer)"
        :init-data="getInitData(data, footer)"
      />
      <template v-else-if="Object.prototype.toString.call(footer) === '[object String]'">
        {{footer}}
      </template>
    </div>
  </el-card>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue';
import { ElCard } from 'element-plus';

import useInitApi from '../mixin/useInitApi';
import useDerivedProp from '../mixin/useDerivedProp';
import initApi from '../mixin/props/init-api';
import mixinProps from '../mixin/props/card';
import dropTools from '../mixin/drop-tools';

export default defineComponent({
  name: 'MisCard',
  components: {
    ElCard,
  },
  mixins: [mixinProps, initApi, dropTools],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { data, ...other } = useInitApi(props);
    const renderHeader = () => ctx.$getRenderedTpl(props.header, data);

    const handleClick= () => {
      if (props.actions) {
        if (Object.prototype.toString.call(props.actions) === '[object Array]') {
          let props = props.actions.find(item => {
            if (
              item.actionOn &&
              ctx.$onExpressionEval(item.actionOn, data)
            ) {
              return item;
            }
          });
          props.actions && props.action(props, data);
        } else {
          props.actions && props.action(props.actions, data);
        }
      }
    };

    return {
      data,
      ...other,
      renderHeader,
      handleClick,
      ...useDerivedProp()
    };
  }
});
</script>
