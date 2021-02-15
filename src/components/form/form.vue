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
    <template v-if="!fieldset">
      <template v-for="(item, index) in inactiveControls">
        <mis-field
          v-if="formItems.includes(item.renderer)"
          v-model="data[item.name]"
          :key="`${path}/${index}/${item.renderer}`"
          :path="`${path}/${index}/${item.renderer}`"
          :name="item.name"
          :props="item"
          :init-data="data"
          :hidden-on="item.hiddenOn"
          :visible-on="item.visibleOn"
          :disabled-on="item.disabledOn"
          :handle-invisible="handleInvisible"
          :linkage-trigger="linkageTrigger"
        />
        <mis-component
          v-else
          v-bind="getFattingProps(item)"
          :key="`${path}/${index}/${item.renderer}`"
          :path="`${path}/${index}/${item.renderer}`"
          :mis-name="item.renderer"
          :props="getFattingProps(item)"
          :init-data="data"
        />
      </template>
    </template>
    <template v-else>
      <el-collapse v-model="activeCollapse">
        <fieldset
          v-for="(control, index) in controls"
          :key="`${path}/${index}`"
          :class="control.classname"
          class="umis-form__container__fieldset"
        >
          <el-collapse-item :name="index">
            <template #title>
              <legend>
                <span class="umis-form__container__legend">
                  {{ control.title }}
                </span>
              </legend>
            </template>
            <div class="umis-form__container__fieldset__items">
              <template
                v-for="(item, jndex) in control.controls"
                :key="`${path}/${jndex}/${item.renderer}`"
              >
                <mis-field
                  v-if="formItems.includes(item.renderer)"
                  v-model="data[item.name]"
                  :path="`${path}/${jndex}/${item.renderer}`"
                  :name="item.name"
                  :props="item"
                  :init-data="data"
                  :hidden-on="item.hiddenOn"
                  :visible-on="item.visibleOn"
                  :disabled-on="item.disabledOn"
                  :handle-invisible="handleInvisible"
                  :linkage-trigger="linkageTrigger"
                />
                <mis-component
                  v-else-if="'mis-action' !==item.renderer && !formItems.includes(item.renderer)"
                  v-bind="getFattingProps(item)"
                  :key="`${path}/${index}/${item.renderer}`"
                  :path="`${path}/${index}/${item.renderer}`"
                  :mis-name="item.renderer"
                  :header="getHeader(item)"
                  :body="getBody(item)"
                  :footer="getFooter(item)"
                  :props="getFattingProps(item)"
                  :init-data="data"
                />
              </template>
            </div>
            <div
              v-if="control.viewer"
              class="umis-form__container__viewer"
            >
              <mis-component
                :path="`${path}/${control.viewer.renderer}`"
                :mis-name="control.viewer.renderer"
                :header="getHeader(control.viewer)"
                :body="getBody(control.viewer)"
                :footer="getFooter(control.viewer)"
                :props="getFattingProps(control.viewer)"
                :init-data="data"
              />
            </div>
          </el-collapse-item>
        </fieldset>
      </el-collapse>
    </template>
    <el-form-item>
      <div class="umis-form__actions">
        <template v-for="(item, index) in activeControls" :key="`${path}/${index}/${item.renderer}`">
          <mis-component
            :ref="item.actionType"
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
import { ElForm, ElSpace } from 'element-plus';

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
  'mis-list'
];

export default {
  name: 'MisForm',
  components: {
    ElForm,
    ElSpace
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    api: {
      type: [Object, String],
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
    fieldset: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelWidth: {
      type: Number,
      required: false,
      default: 'auto'
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
    linkageType: {
      type: String,
      required: false,
      default: 'after'
    },
    linkageTrigger: {
      type: Function,
      required: true,
    },
  },
  data() {
    let activeCollapse = [];
    let data = {};
    for (let i = 0; i < this.controls.length; i++) {
      const controls = this.controls[i].controls || [this.controls[i]];
      activeCollapse.push(i);
      controls.forEach(control => {
        const renderer = control.renderer;
        const name = control.name;
        let value = control.value;
        if (name && formItems.includes(renderer) && 'mis-action' !== renderer) {
          if (typeof value === 'undefined') {
            value = '';
          }
          data[name] = value;
        }
      })
    }

    return {
      activeCollapse,
      formItems,
      data,
      invisibleField: [],
    };
  },
  computed: {
    activeControls() {
      if (!this.fieldset) {
        return this.controls.filter(item => {
          if ('mis-action' === item.renderer) {
            item.actionApi = this.api;
            return item;
          }
        });
      }
      let activeControls = [];
      for (const key in this.controls) {
        if (this.controls.hasOwnProperty(key)) {
          const active = this.controls[key].controls.filter(item => {
            if ('mis-action' === item.renderer) {
              item.actionApi = this.api;
              return item;
            }
          })
          activeControls = activeControls.concat(active);
        }
      }
      return activeControls;
    },
    inactiveControls() {
      if (!this.fieldset) {
        return this.controls.filter(item => 'mis-action' !== item.renderer);
      }
      return [];
    },
  },
  mixins: [initApi, initData, derivedProp],
  mounted() {
    this.$eventHub.$on('mis-component:remoteComponent', this.handleRemoteSubmit);
  },
  methods: {
    handleInvisible(visible, field) {
      if (visible) {
        this.invisibleField = this.invisibleField.filter(
          item => item !== field
        );
      } else {
        this.invisibleField.push(field);
        this.handleResetField(field);
      }
    },
    handleResetField(field) {
      const type = Object.prototype.toString.call(this.data[field]);
      switch (type) {
        case '[object String]': this.data[field] = ''; break;
        case '[object Number]': this.data[field] = 0; break;
        case '[object Boolean]': this.data[field] = false; break;
        case '[object Array]': this.data[field] = []; break;
        case '[object Object]': this.data[field] = {}; break;
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
      if (this.target && this.linkageType === 'before') {
        return this.linkageTrigger(this.target, formData);
      }
      this.handleFetchApi(
        {
          url: this.api.url || this.api,
          method: this.api.method || 'post',
          params: formData,
        },
        res => {
          feedback && feedback();
          this.onAfterSubmit(res);
        }
      );
    },
    onAfterSubmit(res) {
      if (this.redirect) {
        this.$refs['mis-redirect'].$refs['component'].onClick();
      } else if (this.target && this.linkageType === 'after') {
        return this.linkageTrigger(this.target, res);
      } else if (this.reload) {
        this.$eventHub.$emit('mis-component:reload', this.reload);
      }
    },
  },
};
</script>
