<template>
  <transition :name="props.transition">
    <el-form-item
      v-show="iHidden"
      v-if="iVisible"
      :label="props.label"
      :prop="props.prop || props.name"
      :class="props.className"
      :rules="props.rules"
    >
      <template v-if="props.label" #label>
        <span class="umis-form__field">
          <span class="umis-form__field__label">{{ props.label }}</span>
          <el-tooltip v-if="props.tip">
            <i class="el-icon-info" />
            <template #content>
             <div v-html="props.tip" />
            </template>
          </el-tooltip>
        </span>
      </template>
      <component
        v-bind="props"
        :is="props.renderer"
        :path="`${path}/${props.renderer}`"
        :track="`${path}/${props.renderer}`"
        :track-id="props.renderer"
        :name="props.name"
        :init-data="data"
        :value="iValue"
        :disabled="iDisabled"
        :action="action"
        :linkage-trigger="onLinkageTrigger"
        :update-value="updateValue"
        :handle-invisible="handleInvisible"
        @update:value="updateValue"
      />
    </el-form-item>
  </transition>
</template>

<script>
import { defineComponent, watch, reactive, getCurrentInstance } from 'vue';
import { ElTooltip, ElFormItem } from 'element-plus';
import useVisible from '../mixin/useVisible';
import useLinkage from '../mixin/useLinkage';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import visibleProps from '../mixin/props/visible';

export default defineComponent({
  name: 'MisField',
  components: {
    ElTooltip,
    ElFormItem,
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
    prop: {
      type: String,
      required: false,
    },
    props: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [Object, String, Number, Boolean],
      required: true,
    },
    handleInvisible: {
      type: Function,
      required: false,
    },
    action: {
      type: Function,
      required: false,
    },
  },
  mixins: [visibleProps, initApi],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const { iVisible } = useVisible(props, context);
    const updateValue = val => iValue = val;
    let iValue = reactive(props.modelValue);

    watch(iValue, val => context.emit('update:modelValue', val), {
      deep: true,
      immediate: true
    });

    watch(iVisible, val => proxy.handleInvisible(val, props.name), {
      immediate: true
    });

    return {
      iValue,
      updateValue,
      ...useLinkage(props, iValue)
    };
  },
});
</script>
