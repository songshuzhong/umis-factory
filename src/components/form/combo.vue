<template>
  <div class="umis-form__combo">
    <template v-if="multiple">
      <div
        v-for="(item, index) in iValue"
        :key="index"
        class="umis-form__combo__item"
      >
        <mis-field
          v-for="(value, name, key) in item"
          v-model="item[name]"
          :key="`${path}/${index}/${name}`"
          :name="name"
          :data="iValue"
          :field="getFieldByKey(key, index)"
          :path="`${path}/${index}/${name}`"
          :props="controls[key % controls.length]"
          :handle-invisible="handleInvisible"
        />
        <span
          class="umis-form__combo__delete"
          @click="onDelete(index)"
        >
          <i class="el-icon-delete" />
        </span>
      </div>
      <el-form-item :label="' '" class="umis-form__combo__plus">
        <el-button size="mini" icon="el-icon-plus" @click="onAdd" />
      </el-form-item>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in controls"
        :key="index"
        class="umis-form__combo__item"
      >
        <mis-field
          v-model="iValue[item.name]"
          :underline="false"
          :name="item.name"
          :data="iValue"
          :field="getField(item)"
          :path="`${path}/${index}/${item.renderer}`"
          :props="item"
          :handle-invisible="handleInvisible"
        />
      </div>
    </template>
  </div>
</template>
<script>
import clonedeep from 'lodash.clonedeep';
import { ElFormItem, ElLink, ElButton } from 'element-plus';
import visible from '../mixin/visible';
import mixinProps from '../mixin/props/combo';

export default {
  name: 'MisCombo',
  components: {
    ElFormItem,
    ElLink,
    ElButton,
  },
  data() {
    return {
      iValue: '',
    };
  },
  mixins: [mixinProps, visible],
  watch: {
    value: {
      handler(val) {
        if (this.multiple && !Array.isArray(val)) {
          this.iValue = [];
        } else if (!this.multiple && !val) {
          this.iValue = {};
        } else {
          this.iValue = val;
        }
      },
      immediate: true,
    },
    iValue: {
      handler(val) {
        this.updateValue && this.updateValue(val);
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
