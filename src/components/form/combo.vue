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
        <span
          class="umis-form__combo__delete"
          @click="onMapDelete(item.name)"
        >
          <i class="el-icon-delete" />
        </span>
      </div>
    </template>
    <el-form-item :label="' '" class="umis-form__combo__plus">
      <el-button size="mini" icon="el-icon-plus" @click="onAdd" />
    </el-form-item>
  </div>
</template>
<script>
import { defineComponent, watch, reactive, ref } from 'vue';
import clonedeep from 'lodash.clonedeep';
import { ElFormItem, ElLink, ElButton } from 'element-plus';
import useVisible from '../mixin/useVisible';
import mixinProps from '../mixin/props/combo';

export default defineComponent({
  name: 'MisCombo',
  components: {
    ElFormItem,
    ElLink,
    ElButton,
  },
  mixins: [mixinProps],
  setup(props) {
    useVisible();
    let iValue = reactive([]);
    const getField = (item) => {
      const field = clonedeep(item);
      field.prop = `${props.name}.${field.name}`;

      return field;
    };
    const getFieldByKey = (key, index) => {
      const field = clonedeep(props.controls[key]);
      field.prop = `${props.name}[${index}].${field.name}`;
      return field;
    };
    const onAdd = () => {
      const keyMap = props.controls.reduce((total, control) => {
        total[control.name] = '';
        return total;
      }, {});
      iValue.push(keyMap);
    };
    const onDelete = (index) => {
      iValue.splice(index, 1);
    };
    const onMapDelete = (name) => {
      delete iValue[name];
    };
    watch(props.value, val => {
      if (props.multiple && !Array.isArray(val)) {
        iValue.value = [];
      } else if (!props.multiple && !val) {
        iValue = {};
      } else {
        iValue = val;
      }
    });
    watch(iValue, val => {
      props.updateValue && props.updateValue(val);
    });

    return {
      iValue,
      getField,
      getFieldByKey,
      onAdd,
      onDelete,
      onMapDelete
    };
  },
});
</script>
