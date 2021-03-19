<template>
  <div class="umis-form__list">
    <el-checkbox-group
      v-if="multiple"
      v-model="iValue"
      :min="min"
      :max="max"
      @change="onChange"
    >
      <template v-for="(item, index) in iOptions" :key="index">
        <div
          class="umis-list__item"
          :class="{ checked: iValue.includes(item.value) }"
          @click="handleClick(index)"
        >
          <el-checkbox :ref="setRef" :label="item.value" />
          <mis-component
            :mis-name="body.renderer"
            :path="`${path}/${body.renderer}`"
            :index="index"
            :props="getFattingProps(body)"
            :header="getHeader(body)"
            :body="getBody(body)"
            :footer="getFooter(body)"
            :init-data="getInitData(item)"
          />
        </div>
      </template>
    </el-checkbox-group>
    <el-radio-group
      v-else
      v-model="iValue"
      @change="onChange"
    >
      <template v-for="(item, index) in iOptions" :key="index">
        <div
          class="umis-list__item"
          :class="{ checked: iValue.includes(item.value) }"
          @click="handleClick(index)"
        >
          <el-radio :ref="setRef" :label="item.value" />
          <mis-component
            :mis-name="body.renderer"
            :path="`${path}/${body.renderer}`"
            :index="index"
            :props="getFattingProps(body)"
            :header="getHeader(body)"
            :body="getBody(body)"
            :footer="getFooter(body)"
            :init-data="getInitData(item)"
          />
        </div>
      </template>
    </el-radio-group>
  </div>
</template>
<script>
import { defineComponent, reactive, onBeforeUpdate } from 'vue';
import { ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio } from 'element-plus';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/list';

export default defineComponent({
  name: 'MisList',
  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio
  },
  mixins: [mixinProps, derivedProp, initData],
  setup(props) {
    const iValue = reactive(props.value);
    const iOptions = reactive(props.options);
    const setRef = el => optionRefs.push(el);
    const handleClick = index => {
      optionRefs[index].$el.click();
    };
    const onChange = val => {
      props.updateValue && props.updateValue(val);
    };
    let optionRefs = [];

    onBeforeUpdate(() => {
      // optionRefs = [];
    });
    return {
      iOptions,
      iValue,
      setRef,
      onChange,
      handleClick
    };
  }
});
</script>
