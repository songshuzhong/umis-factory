<template>
  <el-popover
    v-if="popupType === 'over'"
    :title="popoverTitle"
    :content="popoverContent"
    :trigger="popoverTrigger"
    :placement="popoverPlacement"
    :popper-class="popperClass"
    :width="popperWidth"
  >
    <template #reference>
      <el-button
        v-loading="iApiLoading"
        :class="classname"
        :size="size"
        :type="type"
        :plain="plain"
        :round="round"
        :circle="circle"
        :icon="icon"
        :disabled="iApiLoading"
      >
        {{ renderText }}
      </el-button>
    </template>
    <mis-component
      v-if="body"
      :mis-name="body.renderer"
      :path="`${path}/${body.renderer}`"
      :body="getBody(body)"
      :header="getHeader(body)"
      :footer="getFooter(body)"
      :props="getFattingProps(body)"
      :init-data="getInitData(data, body)"
      :init-rows="rows"
    />
  </el-popover>
  <el-popconfirm
    v-else-if="popupType === 'confirm'"
    :confirm-button-text="confirmBtnText"
    :cancel-button-text="confirmCancelBtnText"
    :confirm-button-type="confirmBtnType"
    :cancel-button-type="confirmCancelBtnType"
    :icon="confirmIcon"
    :icon-color="confirmIconColor"
    :hide-icon="confirmHideIcon"
    :title="confirmTitle"
    @confirm="onClick"
  >
    <template #reference>
      <el-button
        v-loading="iApiLoading"
        :class="classname"
        :size="size"
        :type="type"
        :plain="plain"
        :round="round"
        :circle="circle"
        :icon="icon"
        :disabled="iApiLoading"
      >
        {{ renderText }}
      </el-button>
    </template>
  </el-popconfirm>
  <el-tooltip
    v-else-if="popupType === 'tip'"
    :disabled="tipDisabled"
    :effect="tipEffect"
    :content="tipContent"
    :placement="tipPlacement"
    :popper-class="popperClass"
    :append-to-body="true"
  >
    <el-button
      v-loading="iApiLoading"
      :size="size"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :icon="icon"
      :disabled="iApiLoading"
      @click="onClick"
    >
      {{ text }}
    </el-button>
  </el-tooltip>
  <el-badge
    v-else-if="popupType === 'badge'"
    :value="badgeText"
    :class="badgeClass"
  >
    <el-button
      v-loading="iApiLoading"
      :class="classname"
      :size="size"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :icon="icon"
      :disabled="iApiLoading"
      @click="onClick"
    >
      {{ text }}
    </el-button>
  </el-badge>
  <el-button-group
    v-else-if="popupType === '' && actions"
    v-loading="iApiLoading"
  >
    <template
      v-for="(item, index) in actions"
      :key="`${path}/${index}`"
    >
      <el-button
        v-bind="item"
        :index="index"
        :disabled="iApiLoading || iDisabled(item.disabledOn)"
        @click="onClick"
      >
        {{ item.text }}
      </el-button>
    </template>
  </el-button-group>
  <el-button
    v-else
    v-loading="iApiLoading"
    :class="classname"
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :icon="icon"
    :disabled="disabled || iApiLoading"
    @click.native="onClick"
  >
    {{ renderText }}
  </el-button>
</template>
<script>
import {
  ElPopover,
  ElPopconfirm,
  ElTooltip,
  ElBadge,
  ElButton,
  ElButtonGroup,
} from 'element-plus';

import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';
import initApi from './mixin/init-api';

export default {
  name: 'MisAction',
  components: {
    ElPopover,
    ElPopconfirm,
    ElTooltip,
    ElBadge,
    ElButton,
    ElButtonGroup,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    body: {
      type: Object,
      required: false,
    },
    action: {
      type: Function,
      required: false,
    },
    afterAction: {
      type: Function,
      required: false,
    },
    actionApi: {
      type: [Object, String],
      required: false,
    },
    actions: {
      type: Array,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    renderer: {
      type: String,
      required: true,
    },
    classname: {
      type: String,
      required: false,
    },
    popperClass: {
      type: String,
      required: false,
    },
    popperWidth: {
      type: [String, Number],
      required: false,
    },
    showPopup: {
      type: Boolean,
      required: false,
    },
    popupType: {
      type: String,
      required: false,
      default: ''
    },
    size: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    plain: {
      type: Boolean,
      required: false,
    },
    round: {
      type: Boolean,
      required: false,
    },
    circle: {
      type: Boolean,
      required: false,
    },
    tipDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    tipEffect: {
      type: String,
      required: false,
    },
    tipContent: {
      type: String,
      required: false,
    },
    tipPlacement: {
      type: String,
      required: false,
    },
    confirmTitle: {
      type: String,
      required: false,
    },
    confirmCancelBtnText: {
      type: String,
      required: false,
    },
    confirmCancelBtnType: {
      type: String,
      required: false,
    },
    confirmBtnText: {
      type: String,
      required: false,
    },
    confirmBtnType: {
      type: String,
      required: false,
    },
    confirmIcon: {
      type: String,
      required: false,
    },
    confirmIconColor: {
      type: String,
      required: false,
    },
    confirmHideIcon: {
      type: Boolean,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    badgeText: {
      type: String,
      required: false,
    },
    badgeClass: {
      type: String,
      required: false,
    },
    popoverTitle: {
      type: String,
      required: false,
      default: ''
    },
    popoverContent: {
      type: String,
      required: false,
      default: ''
    },
    popoverTrigger: {
      type: String,
      required: false,
      default: 'click'
    },
    popoverPlacement: {
      type: String,
      required: false,
      default: 'bottom'
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
  },
  data() {
    return {
      iShowPopup: false,
      index: 0,
    };
  },
  watch: {
    showPopup: {
      handler(val) {
        this.iShowPopup = val;
      },
      immediate: true,
    },
    iShowPopup(val) {
      this.$emit('update:showPopup', val);
    },
  },
  mixins: [derivedProp, initData, initApi],
  computed: {
    renderText() {
      return this.$getRenderedTpl(this.text, this.data);
    },
  },
  methods: {
    iDisabled(disabledOn) {
      if (disabledOn) {
        const context = {$router: this.$router, ...this.data};
        return this.$onExpressionEval(disabledOn, this.data);
      }
      return false;
    },
    onClick() {
      const attributes = event.currentTarget.attributes;
      let index;
      let actionType;
      let remoteComponent;
      if (this.actions) {
        index = attributes.index && attributes.index.value;
        remoteComponent = attributes.remotecomponent && attributes.remotecomponent.value;
        actionType = this.actions[index].actionType;
        this.index = index;
      } else {
        actionType = this.$attrs.actionType;
      }

      if (remoteComponent || this.remoteComponent) {
        this.$eventHub.$emit(
          'mis-component:remoteComponent',
          actionType,
          remoteComponent ||this.remoteComponent,
          this.handleAfterAction
        );
      } else if (typeof index === 'string') {
        this.action(
          {
            actions: true,
            ...this.actions[index],
          },
          this.data,
          this.handleAfterAction
        );
      } else {
        const { renderer, actionApi } = this.$props;
        const { header, footer, ...other } = this.$attrs;
        this.action(
          {
            renderer,
            actionType,
            actionApi,
            ...other,
          },
          this.data,
          this.handleAfterAction
        );
      }
    },
    handleAfterAction() {
      if (this.afterAction && typeof this.afterAction === 'function') {
        this.afterAction();
      }
      if (this.target) {
        this.linkageTrigger(this.target, this.data);
      }
    },
  },
};
</script>
