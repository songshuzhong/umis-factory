<template>
  <el-form
    v-loading="iApiLoading"
    ref="form"
    class="umis-form__container"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :model="data"
    :inline="inline"
    drop-position="controls"
    @dragover="dragOver"
    @drop="drop"
  >
    <template v-if="!fieldset">
      <template
        v-for="(item, index) in inactiveControls"
        :key="`${path}/controls/${index}/${item.renderer}`"
      >
        <mis-field
          v-model="data[item.name]"
          :path="`${path}/controls/${index}`"
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
                  :path="`${path}/${jndex}`"
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
            :path="`${path}/controls/${index}`"
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
import { defineComponent, onMounted, watch, computed, reactive, ref, getCurrentInstance } from 'vue';
import { ElForm, ElSpace } from 'element-plus';

import useDerivedProp from '../mixin/useDerivedProp';
import useInitApi from '../mixin/useInitApi';
import initApi from '../mixin/props/init-api';
import initData from '../mixin/init-data';
import mixinProps from '../mixin/props/form';
import dropTools from '../mixin/drop-tools';

export default defineComponent({
  name: 'MisForm',
  components: {
    ElForm,
    ElSpace
  },
  mixins: [dropTools, mixinProps, initApi, initData],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const activeCollapse = [];
    const data = {};
    for (let i = 0; i < props.controls.length; i++) {
      let controls;
      if (props.fieldset && props.controls[i].renderer !== 'mis-combo') {
        controls = props.controls[i].controls
      } else {
        controls = [props.controls[i]];
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
    const iData = reactive(data);
    let invisibleField = [];
    const activeControls = computed(() => {
      if (!props.fieldset) {
        return props.controls.filter(item => {
          if ('mis-action' === item.renderer) {
            item.actionApi = props.initApi;
            return item;
          }
        });
      }
      let activeControls = [];
      for (const key in props.controls) {
        if (props.controls.hasOwnProperty(key)) {
          const active = props.controls[key].controls.filter(item => {
            if ('mis-action' === item.renderer) {
              item.actionApi = props.initApi;
              return item;
            }
          })
          activeControls = activeControls.concat(active);
        }
      }
      return activeControls;
    });
    const inactiveControls = computed(() => {
      if (!props.fieldset) {
        return props.controls.filter(item => 'mis-action' !== item.renderer);
      }
      return [];
    });

    const handleInvisible = (visible, field) => {
      if (visible) {
        invisibleField = invisibleField.filter(
          item => item !== field
        );
      } else {
        invisibleField.push(field);
        handleResetField(field);
      }
    };
    const handleResetField = (field) => {
      const type = Object.prototype.toString.call(iData[field]);
      switch (type) {
        case '[object String]': iData[field] = ''; break;
        case '[object Number]': iData[field] = 0; break;
        case '[object Boolean]': iData[field] = false; break;
        case '[object Array]': iData[field] = []; break;
        case '[object Object]': iData[field] = {}; break;
      }
    };
    const handleRemoteSubmit = (actionType, target, feedback) => {
      if (props.name && props.name === target) {
        const form = ctx.$.$refs['form'];
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
    };
    const onBeforeSubmit = () => {
      const attributes = event.currentTarget.attributes;
      const form = ctx.$.$refs['form'];
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
            sendFormData();
          }
        });
      }
    };
    const sendFormData = (feedback) => {
      const formData = {};

      for (let name in iData) {
        if (
          iData.hasOwnProperty(name) &&
          !invisibleField.includes(name)
        )
          formData[name] = iData[name];
      }
      if (props.target && props.linkageType === 'before') {
        return props.linkageTrigger(props.target, formData);
      }
      this.handleFetchApi(
        {
          url: props.initApi.url,
          method: props.initApi.method || 'post',
          params: formData,
        },
        res => {
          feedback && feedback();
          onAfterSubmit(res);
        }
      );
    };
    const onAfterSubmit = res => {
      if (props.redirect) {
        ctx.$.$refs['mis-redirect'].$refs['component'].onClick();
      } else if (props.target && props.linkageType === 'after') {
        return props.linkageTrigger(props.target, res);
      } else if (props.reload) {
        ctx.$eventHub.$emit('mis-component:reload', props.reload);
      }
    };

    onMounted(() => {
      ctx.$eventHub.$on('mis-component:remoteComponent', handleRemoteSubmit);
    });

    return {
      iData,
      activeCollapse,
      invisibleField,
      activeControls,
      inactiveControls,
      handleInvisible,
      onBeforeSubmit,
      ...useInitApi(props, ctx),
      ...useDerivedProp()
    };
  }
});
</script>
