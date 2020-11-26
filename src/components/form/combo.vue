<template>
  <div class="umis-form-combo">
    <template v-if="multiple">
      <div
        v-for="(item, index) in iValue"
        :key="index"
        class="umis-form-combo__item"
      >
        <mis-field
          v-for="(value, name, key) in item"
          v-model="iValue[index][name]"
          :key="`${path}/${index}/${name}`"
          :name="name"
          :data="iValue"
          :field="getFieldByKey(key, index)"
          :path="`${path}/${index}/${name}`"
        />
        <el-link
          class="umis-form-combo__delete"
          icon="el-icon-delete"
          @click="onDelete(index)"
        />
      </div>
      <el-form-item :label="' '" class="umis-form-combo__plus">
        <el-button icon="el-icon-plus" @click="onAdd" />
      </el-form-item>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in controls"
        :key="index"
        class="umis-form-combo__item"
      >
        <mis-field
          v-model="iValue[item.name]"
          :underline="false"
          :name="item.name"
          :data="iValue"
          :field="getField(item)"
          :path="`${path}/${index}/${item.renderer}`"
        />
      </div>
    </template>
  </div>
</template>
<script>
import clonedeep from 'lodash.clonedeep';
import { Button as ElButton } from 'element-ui';
import { Link as ElLink } from 'element-ui';
import { FormItem as ElFormItem } from 'element-ui';

export default {
  name: 'MisCombo',
  components: {
    ElFormItem,
    ElLink,
    ElButton,
  },
  props: {
    controls: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Array, Object],
      required: false,
      default: {},
    },
    data: {
      type: [Array, Object],
      required: false,
      default: {},
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
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
    iValue: {
      handler(val) {
        this.$emit('input', val);
      },
      deep: true,
    },
  },
  methods: {
    getField(item) {
      const field = clonedeep(item);
      field.prop = `${this.name}.${field.name}`;

      return field;
    },
    getFieldByKey(key, index) {
      const field = clonedeep(this.controls[key]);
      field.prop = `${this.name}[${index}].${field.name}`;
      return field;
    },
    onAdd() {
      const keyMap = this.controls.reduce((total, control) => {
        total[control.name] = '';
        return total;
      }, {});
      this.iValue.push(keyMap);
    },
    onDelete(index) {
      this.iValue.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.umis-form-combo {
  border: 1px dashed #dee2e6;
  &:hover {
    border: 1px dashed #409eff;
  }
}
.umis-form-combo__item {
  display: flex;
  padding: 11px 0;
}
.umis-form-combo__plus {
  padding: 11px 0;
}
.umis-form-combo__delete {
  margin: 0 10px;
}
</style>
