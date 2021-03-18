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
      <template
        v-for="(item, index) in inactiveControls"
        :key="`${path}/${index}/${item.renderer}`"
      >
        <mis-field
          v-model="data[item.name]"
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
                  v-if="item.renderer !== 'mis-action'"
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
import mixinProps from '../mixin/props/form';

export default {
  name: 'MisForm',
  components: {
    ElForm,
    ElSpace
  },
  data() {
    let activeCollapse = [];
    let data = {};
    for (let i = 0; i < this.controls.length; i++) {
      let controls;
      if (this.fieldset && this.controls[i].renderer !== 'mis-combo') {
        controls = this.controls[i].controls
      } else {
        controls = [this.controls[i]];
      }
      activeCollapse.push(i);
      controls.forEach(control => {
        const renderer = control.renderer;
        const name = control.name;
        let value = control.value;
        if (name && 'mis-action' !== renderer) {
          if (typeof value === 'undefined') {
            value = '';
          }
          data[name] = value;
        }
      })
    }
    return {
      activeCollapse,
      data,
      invisibleField: [],
    };
  },
  computed: {
    activeControls() {
      if (!this.fieldset) {
        return this.controls.filter(item => {
          if ('mis-action' === item.renderer) {
            item.actionApi = this.initApi;
            return item;
          }
        });
      }
      let activeControls = [];
      for (const key in this.controls) {
        if (this.controls.hasOwnProperty(key)) {
          const active = this.controls[key].controls.filter(item => {
            if ('mis-action' === item.renderer) {
              item.actionApi = this.initApi;
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
  mixins: [mixinProps, initApi, initData, derivedProp],
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
          url: this.initApi.url,
          method: this.initApi.method || 'post',
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
