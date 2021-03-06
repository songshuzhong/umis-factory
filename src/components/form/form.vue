<template>
  <el-form
    v-loading="iApiLoading"
    ref="form"
    class="umis-form__container"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :model="data"
    :inline="inline"
  >
    <template v-for="(item, index) in inactiveControls">
      <mis-field
        v-if="formItems.includes(item.renderer)"
        v-model="data[item.name]"
        :key="`${path}/${index}/${item.renderer}`"
        :path="`${path}/${index}/${item.renderer}`"
        :name="item.name"
        :field="item"
        :init-data="data"
        :hidden-on="item.hiddenOn"
        :visible-on="item.visibleOn"
        :disabled-on="item.disabledOn"
        :handle-invisible="handleInvisible"
        :linkage-trigger="linkageTrigger"
      />
      <mis-component
        v-else
        :key="`${path}/${index}/${item.renderer}`"
        :path="`${path}/${index}/${item.renderer}`"
        :mis-name="item.renderer"
        :props="getFattingProps(item)"
        :init-data="data"
      />
    </template>
    <el-form-item>
      <div class="umis-form__actions">
        <template v-for="(item, index) in activeControls">
          <mis-component
            :ref="item.actionType"
            :key="`${path}/${index}/${item.renderer}`"
            :path="`${path}/${index}/${item.renderer}`"
            :mis-name="item.renderer"
            :header="getHeader(item)"
            :body="getBody(item)"
            :footer="getFooter(item)"
            :props="getFattingProps(item)"
            :init-data="data"
            :hidden-on="item.hiddenOn"
            :visible-on="item.visibleOn"
            :disabled-on="item.disabledOn"
            :action="onBeforeSubmit"
          />
        </template>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import { Form as ElForm } from 'element-ui';

import derivedProp from '../mixin/derived-prop';
import initApi from '../mixin/init-api';
import initData from '../mixin/init-data';

const formItems = [
  'mis-field',
  'mis-select',
  'mis-checkbox',
  'mis-radio',
  'mis-switch',
  'mis-datepicker',
  'mis-input',
  'mis-combo',
  'mis-upload',
];

export default {
  name: 'MisForm',
  components: {
    ElForm,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    controls: {
      type: Array,
      required: false,
    },
    labelWidth: {
      type: Number,
      required: false,
      default: 'auto',
    },
    labelPosition: {
      type: String,
      required: false,
      default: 'right',
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
    redirect: {
      type: String,
      required: false,
    },
    reload: {
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
  },
  data() {
    return {
      formItems: formItems,
      invisibleField: [],
      data: this.controls.reduce((total, control) => {
        const renderer = control.renderer;
        const name = control.name;
        const value = control.value;
        if (name && formItems.includes(renderer) && 'mis-action' !== renderer) {
          total[name] = value;
        }
        return total;
      }, {}),
    };
  },
  computed: {
    activeControls() {
      return this.controls.filter(item => {
        if ('mis-action' === item.renderer) {
          item.actionApi = this.api;
          return item;
        }
      });
    },
    inactiveControls() {
      return this.controls.filter(item => 'mis-action' !== item.renderer);
    },
  },
  mixins: [initApi, initData, derivedProp],
  mounted() {
    this.$eventHub.$on('mis-component:form', this.handleRemoteSubmit);
  },
  methods: {
    handleInvisible(visible, field) {
      if (visible) {
        this.invisibleField = this.invisibleField.filter(
          item => item !== field
        );
      } else {
        this.invisibleField.push(field);
      }
    },
    handleRemoteSubmit(actionType, target, feedback) {
      if (this.name && this.name === target) {
        const form = this.$refs['form'];
        if (form && actionType === 'mis-reset') {
          form.resetFields();
        } else if (form && actionType === 'mis-submit') {
          form.validate(valid => {
            if (valid) {
              this.sendFormData(feedback);
            }
          });
        }
      }
    },
    onBeforeSubmit() {
      const attributes = event.currentTarget.attributes;
      const form = this.$refs['form'];
      if (
        attributes.actionType &&
        attributes.actionType.value === 'mis-reset'
      ) {
        form.resetFields();
      } else if (
        attributes.actionType &&
        attributes.actionType.value === 'mis-submit'
      ) {
        form.validate(valid => {
          if (valid) {
            this.sendFormData();
          }
        });
      }
    },
    sendFormData(feedback) {
      const formData = {};

      for (let name in this.data) {
        if (
          this.data.hasOwnProperty(name) &&
          !this.invisibleField.includes(name)
        )
          formData[name] = this.data[name];
      }
      if (this.target) {
        return this.linkageTrigger(this.target, formData);
      }
      this.handleFetchApi(
        {
          url: this.api.url || this.api,
          method: this.api.method || 'post',
          params: formData,
        },
        () => {
          feedback && feedback();
          this.onAfterSubmit();
        }
      );
    },
    onAfterSubmit() {
      if (this.redirect) {
        this.$refs['mis-redirect'][0].$children[0].onClick();
      } else if (this.reload) {
        this.$eventHub.$emit('mis-component:reload', this.reload);
      }
    },
  },
};
</script>
