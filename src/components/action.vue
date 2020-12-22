<template>
  <el-popconfirm
    v-if="confirmTitle"
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
    <el-button
      v-loading="iApiLoading"
      slot="reference"
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
  </el-popconfirm>
  <el-tooltip
    v-else-if="tipContent"
    :disabled="tipDisabled"
    :effect="tipEffect"
    :content="tipContent"
    :placement="tipPlacement"
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
  <el-badge v-else-if="badgeText" :value="badgeText" :class="badgeClass">
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
  </el-badge>
  <el-button-group v-else-if="actions" v-loading="iApiLoading">
    <template v-for="(item, index) in actions">
      <el-button
        v-bind="item"
        :key="`${path}/${index}`"
        :index="index"
        :disabled="iApiLoading"
        @click="onClick"
      >
        {{ item.text }}
      </el-button>
    </template>
  </el-button-group>
  <el-button
    v-else
    v-loading="iApiLoading"
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
  Popconfirm as ElPopconfirm,
  Tooltip as ElTooltip,
  Badge as ElBadge,
  Button as ElButton,
  ButtonGroup as ElButtonGroup,
} from 'element-ui';

import derivedProp from './mixin/derived-prop';
import initData from './mixin/init-data';
import initApi from './mixin/init-api';

export default {
  name: 'MisAction',
  components: {
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
      required: true,
    },
    body: {
      type: Object,
      required: false,
    },
    action: {
      type: Function,
      required: false,
    },
    actionApi: {
      type: Object,
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
    showPopup: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
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
      default: true,
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
    target: {
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
    onClick() {
      let index;
      let actionType;
      if (this.actions) {
        index = event.currentTarget.attributes.index.value;
        actionType = this.actions[index].actionType;
        this.index = index;
      } else {
        actionType = this.$attrs.actionType;
      }
      if (typeof index === 'string') {
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
      this.linkageTrigger(this.target, this.data);
    },
  },
};
</script>
