<template>
  <el-select
    v-model="iValue"
    :name="name"
    :size="size"
    :disabled="disabled"
    :clearable="clearable"
    :multiple="multiple"
    :filterable="filterable"
    :placeholder="placeholder"
    @change="onChange"
    @clear="onClear"
  >
    <el-option
      v-for="option in iOptions"
      :key="option.value"
      :label="option.text"
      :value="getJoinValue(option)"
      :disabled="option.disabled"
    >
    </el-option>
  </el-select>
</template>
<script>
import { ElSelect, ElOption } from 'element-plus';
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';

export default {
  name: 'MisSelect',
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Array, String, Number],
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    clearable: {
      type: Boolean,
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
    joinValue: {
      type: Boolean,
      required: false,
    },
    filterable: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    cached: {
      type: Object,
      required: false,
      default: {}
    },
    target: {
      type: String,
      required: false,
    },
    remoteComponent: {
      type: String,
      required: false,
    },
    linkageTrigger: {
      type: Function,
      required: false,
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      iValue: [],
      iOptions: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.iValue = val;
      },
      immediate: true,
    },
    iValue: {
      handler(value, oldValue) {
        this.handleCache(value, oldValue);
        this.updateValue && this.updateValue(value);
      },
    },
    options: {
      handler(val) {
        if (val && val.length) {
          this.iOptions = val;
        }
      },
      immediate: true,
      deep: true,
    },
    rows: {
      handler(val) {
        if (val && val.length) {
          this.iOptions = val;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mixins: [initApi, initData],
  methods: {
    onChange(val) {
      this.iValue = val;
      this.handleLinkage();
    },
    onClear() {
      this.$eventHub.$emit('mis-component:remoteComponent', '', this.remoteComponent, this.handleLinkage);
    },
    getJoinValue(option) {
      if (this.joinValue) {
        return { value: option.value, text: option.text };
      }
      return option.value;
    },
    handleLinkage() {
      if (this.target) {
        const linkage = {};
        linkage[this.name] = this.iValue;
        this.linkageTrigger(this.target, linkage);
      }
    },
    handleCache(value, oldValue) {
      const context = {value, oldValue, data: this.data};
      if (this.cached.in && this.cached.in.condition) {
        const shouldCachedIn = this.$onExpressionEval(this.cached.in.condition, context);
        if (shouldCachedIn) {
          let cacheInData = this[this.cached.primaryKey];
          cacheInData = JSON.stringify(cacheInData);
          sessionStorage.setItem(this.cached.name, cacheInData);
        }
      }
      if (this.cached.out && this.cached.out.condition) {
        const shouldCacheOut = this.$onExpressionEval(this.cached.out.condition, context);
        if (shouldCacheOut) {
          let cacheOutData = sessionStorage.getItem(this.cached.name);
          if (cacheOutData && typeof cacheOutData === 'string') {
            cacheOutData = JSON.parse(cacheOutData);
            this.linkageTrigger(this.cached.target, cacheOutData);
          }
        }
      }
    }
  },
};
</script>
