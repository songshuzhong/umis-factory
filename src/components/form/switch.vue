<template>
  <el-switch
    v-model="iValue"
    :disabled="disabled"
    :width="width"
    :active-icon-class="activeIconClass"
    :active-text="activeText"
    :inactive-text="inActiveText"
    :active-value="activeValue"
    :inactive-value="inActiveValue"
    :active-color="activeColor"
    :inactive-color="inActiveColor"
    @change="onChange"
  />
</template>
<script>
import { ElSwitch } from 'element-plus';

export default {
  name: 'MisSwitch',
  components: {
    ElSwitch,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    activeIconClass: {
      type: String,
      required: false,
    },
    activeText: {
      type: String,
      required: false,
    },
    inActiveText: {
      type: String,
      required: false,
    },
    activeValue: {
      type: [Boolean, String, Number],
      required: false,
      default: true,
    },
    inActiveValue: {
      type: [Boolean, String, Number],
      required: false,
      default: false,
    },
    activeColor: {
      type: String,
      required: false,
    },
    inActiveColor: {
      type: String,
      required: false,
    },
    target: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: true,
    },
    updateValue: {
      type: Function,
      required: false,
    }
  },
  data() {
    return {
      iValue: '',
    };
  },
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
  },
  mounted() {
    this.$eventHub.$on('mis-component:remoteComponent', this.handleRemoteClick);
  },
  methods: {
    onChange(val) {
      this.iValue = val;
      this.updateValue && this.updateValue(val);

      if (this.target) {
        const linkage = {};
        linkage[this.name] = this.iValue;
        this.linkageTrigger && this.linkageTrigger(this.target, linkage);
      }
    },
    handleRemoteClick(actionType, target, feedback) {
      if (target && target === this.name) {
        const linkage = {};
        this.iValue = !this.iValue;
        this.updateValue && this.updateValue(this.iValue);
        linkage[this.name] = this.iValue;
        this.linkageTrigger && this.linkageTrigger(this.target, linkage);
      }
    }
  },
};
</script>
