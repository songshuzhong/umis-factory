<template>
  <div class="umis-steps__container">
    <el-steps
      :path="path"
      :active="iActive"
      :simple="true"
      :name="name"
      :direction="direction"
      :align-center="alignCenter"
      :finish-status="finishStatus"
      :process-status="processStatus"
    >
      <template v-for="(item, index) in body" :key="index">
        <el-step
          :title="item.title"
          :icon="item.icon"
          :status="item.status"
          :description="item.description"
        />
      </template>
    </el-steps>
    <div
      v-loading="!iShow"
      class="el-steps__main"
    >
      <mis-component
        v-if="iShow"
        ref="form"
        mis-name="mis-form"
        :index="iActive - 1"
        :path="`${path}/${iActive}`"
        :init-data="data"
        :props="{
          renderer: 'mis-form',
          controls: body[iActive - 1].controls
        }"
      />
    </div>
    <div class="el-steps__footer">
      <el-button
        :disabled="iActive === 1"
        @click="previous"
      >
        上一步
      </el-button>
      <el-button
        v-if="iActive < body.length"
        @click="next"
      >
        下一步
      </el-button>
      <el-button
        v-loading="iApiLoading"
        v-if="iActive === body.length"
        @click="done"
      >
        完成
      </el-button>
      <mis-component
        v-if="redirect"
        ref="redirect"
        mis-name="mis-action"
        :path="`${path}/mis-action`"
        :init-data="data"
        hidden-on="1 === 1"
        :props="{
          renderer: 'mis-action',
          actionType: 'mis-redirect',
          redirect: redirect,
        }"
      />
    </div>
  </div>
</template>

<script>
import { ElCard, ElSteps, ElStep, ElButton } from 'element-plus';

import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';
import initApi from './mixin/init-api';

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
  name: 'MisSteps',
  components: {
    ElCard,
    ElSteps,
    ElStep,
    ElButton
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    api: {
      type: [Object, String],
      required: false,
    },
    direction: {
      type: String,
      required: false,
    },
    active: {
      type: String,
      required: false,
    },
    processStatus: {
      type: String,
      required: false,
    },
    finishStatus: {
      type: String,
      required: false,
    },
    alignCenter: {
      type: Boolean,
      required: false,
    },
    simple: {
      type: Boolean,
      required: false,
    },
    header: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    footer: {
      type: Array,
      required: true,
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
    let formdata = {}
    for (const key in this.body) {
      if (this.body.hasOwnProperty(key)) {
        this.body[key].controls.forEach(control => {
          const renderer = control.renderer;
          const name = control.name;
          const value = control.value || '';
          if (name && formItems.includes(renderer) && 'mis-action' !== renderer) {
            formdata[name] = value;
          }
        })
      }
    }
    return {
      iShow: true,
      iActive: 1,
      data: formdata,
    };
  },
  watch: {
    active: {
      handler(val) {
        this.iActive = val || 1;
      },
      immediate: true,
    },
  },
  mixins: [initApi, initData, derivedProp],
  methods: {
    previous() {
      this.beforeUpdateActive().then(() => {
        this.iShow = false;
        if (this.iActive > 1) {
          --this.iActive;
        }
        this.mergeFormData();
        this.$nextTick(() => {
          this.iShow = true;
        });
      }).catch();
    },
    next() {
      this.beforeUpdateActive().then(() => {
        this.iShow = false;
        if (this.iActive < this.body.length) {
          ++this.iActive;
        }
        this.mergeFormData();
        this.$nextTick(() => {
          this.iShow = true;
        });
      }).catch();
    },
    done() {
      this.beforeUpdateActive().then(() => {
        this.mergeFormData();
        this.handleFetchApi({
          url: this.api.url || this.api,
          method: this.api.method || 'post',
          params: this.data,
        }, () => {
          this.onAfterSubmit();
        });
      }).catch();
    },
    mergeFormData() {
      const data = this.$refs.form.$refs.component.data;
      Object.assign(this.data, data);
    },
    beforeUpdateActive() {
      return new Promise((resolve, reject) => {
        this.$refs.form.$refs.component.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    onAfterSubmit() {
      if (this.redirect) {
        this.$refs['redirect'].$refs['component'].onClick();
      } else if (this.reload) {
        this.$eventHub.$emit('mis-component:reload', this.reload);
      }
    },
  },
};
</script>
