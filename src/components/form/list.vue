<template>
  <div class="umis-form__list">
    <el-checkbox-group
      v-if="multiple"
      v-model="iValue"
      :min="min"
      :max="max"
    >
      <template v-for="(item, index) in rows" :key="index">
        <div
          class="umis-list__item"
          :class="{ checked: iValue.includes(item.value) }"
          @click="handleClick(index)"
        >
          <el-checkbox :ref="`list__${index}`" :label="item.value" />
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
    >
      <template v-for="(item, index) in rows" :key="index">
        <div
          class="umis-list__item"
          :class="{ checked: iValue.includes(item.value) }"
          @click="handleClick(index)"
        >
          <el-radio :ref="`list__${index}`" :label="item.value" />
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
import { ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio } from 'element-plus';
import derivedProp from '../mixin/derived-prop';
import initData from '../mixin/init-data';

export default {
  name: 'MisList',
  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio
  },
  props: {
    path: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: false
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true
    },
    body: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    updateValue: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      rows: [],
      iValue: []
    };
  },
  watch: {
    watch: {
      value: {
        handler(val) {
          this.iValue = val;
        },
        immediate: true,
      },
    },
    list: {
      handler(val) {
        if (!this.initApi && val) {
          this.rows = val;
        }
      },
      immediate: true
    },
    iValue(val) {
      this.updateValue && this.updateValue(val);
    }
  },
  mixins: [derivedProp, initData],
  methods: {
    handleClick(index) {
      this.$refs[`list__${index}`].$el.click();
    }
  }
}
</script>

