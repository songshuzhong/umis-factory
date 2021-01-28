<template>
  <transition :name="field.transition">
    <el-form-item
      v-show="iHidden"
      v-if="iVisible"
      :label="field.label"
      :prop="field.prop || field.name"
      :class="field.className"
      :rules="field.rules"
    >
      <template v-if="field.label" #label>
        <span class="umis-form__field">
          <span class="umis-form__field__label">{{ field.label }}</span>
          <el-tooltip v-if="field.tip">
            <i class="el-icon-info" />
            <template #content>
             <div v-html="field.tip" />
            </template>
          </el-tooltip>
        </span>
      </template>
      <component
        v-bind="field"
        :is="field.renderer"
        :path="`${path}/${field.renderer}`"
        :name="field.name"
        :init-data="data"
        :value="iValue"
        :disabled="iDisabled"
        :action="action"
        :linkage-trigger="linkageTrigger"
        :update-value="updateValue"
      />
    </el-form-item>
  </transition>
</template>

<script>
import { ElTooltip, ElFormItem } from 'element-plus';
import visible from '../mixin/visible';
import initData from '../mixin/init-data';

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
    field: {
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
    linkageTrigger: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      iValue: '',
    };
  },
  mixins: [visible, initData],
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
