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
import { ElTooltip, ElFormItem } from 'element-plus';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';
import linkage from '../mixin/linkage';

export default {
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
  data() {
    return {
      iValue: '',
    };
  },
  mixins: [linkage, visible, initData],
  watch: {
    modelValue: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
    iValue: {
      handler(val) {
        this.$emit('update:modelValue', val);
      },
      deep: true
    },
    iVisible: {
      handler(val) {
        this.handleInvisible(val, this.name);
      },
      immediate: true
    },
  },
  methods: {
    updateValue(value) {
      this.iValue = value;
    },
  },
};
</script>
