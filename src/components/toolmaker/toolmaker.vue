<template>
  <section class="umis-toolmaker-wrapper">
    <ul class="umis-toolmaker__menu">
      <li
        class="umis-toolmaker__menu__item"
        draggable="true"
        v-for="(component, name, index) in componentMap"
        :key="index"
        :data-name="`mis-${name}`"
        @dragstart="dragStart"
      >
        <span :class="component.icon" />
        <span class="umis-toolmaker__menu__item__label">
          {{component.chName}}
        </span>
      </li>
    </ul>
    <section
      class="umis-toolmaker__container"
      @dragover="dragOver"
      @drop="drop"
      @click.capture.stop="handleClick"
    >
      <mis-schema
        v-if="schemaInstance"
        :schema="schemaInstance"
      />
    </section>
    <section
      v-if="activeNode"
      class="umis-toolmaker__wedgets"
      :style="{
        top: `${offsetTop + 30}px`,
        left: `${offsetLeft + 280}px`
      }"
    >
      <el-button-group class="umis-toolmaker__tools">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="onEdit" />
        <el-button size="mini" type="primary" icon="el-icon-top" @click="onTop" />
        <el-button size="mini" type="primary" icon="el-icon-bottom" @click="onBottom" />
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete" />
      </el-button-group>
      <div
        class="umis-toolmaker__mask"
        :style="{
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`
        }"
        @click.stop="handleInactive"
      />
    </section>
    <el-drawer
      v-model="drawerVisible"
      destroy-on-close
      append-to-body
      custom-class="umis-toolmaker__drawer__container"
    >
      <div class="umis-toolmaker__drawer__content">
        <props-editor
          ref="propsEditorRef"
          :active-json="activeJson"
          :active-renderer="activeRenderer"
          :origin-api-props="originApiProps"
          :origin-normal-props="originNormalProps"
          :edit-tab-change="onEditTabChange"
        />
      </div>
      <div class="umis-toolmaker__drawer__footer">
        <el-button
          size="mini"
          type="primary"
          @click="drawerVisible = false"
        >
          取 消
        </el-button>
        <el-button
          size="mini"
          type="danger"
          :loading="loading"
          @click="submitForm"
        >
          {{ loading ? '提交中 ...' : '确 定' }}
        </el-button>
      </div>
    </el-drawer>
  </section>
</template>
<script>
import { ElButtonGroup, ElButton, ElDrawer, ElForm, ElFormItem, ElInput } from 'element-plus';
import clonedeep from 'lodash.clonedeep';
import MisSchema from '../container/schema';
import PropsEditor from './props-editor';
import dropTools from '../mixin/drop-tools';
import componentMap from '../../utils/map';

export default {
  name: 'MisDragger',
  components: {
    ElButtonGroup,
    ElButton,
    ElDrawer,
    ElForm,
    ElFormItem,
    ElInput,
    MisSchema,
    PropsEditor
  },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      componentMap,
      activeTab: '',
      activeRenderer: '',
      activeNode: '',
      offsetTop: '',
      offsetLeft: '',
      offsetWidth: '',
      offsetHeight: '',
      drawerVisible: false,
      activeJson: {},
      originApiProps: {},
      originNormalProps: {},
    }
  },
  mixins: [dropTools],
  watch: {
    drawerVisible: {
      handler(val) {
        if (!val) {
          this.handleInactive();
        }
      }
    }
  },
  methods: {
    handleClick(e) {
      const node = this.findMisComponent(e.target);
      const track = node.getAttribute('track');
      if (this.activeTrack !== track) {
        if (this.activeNode) {
          this.activeNode.classList.remove('umis-toolmaker__active');
        }
        this.activeTrack = track;
        this.offsetLeft = node.offsetLeft;
        this.offsetTop = node.offsetTop;
        this.offsetWidth = node.offsetWidth;
        this.offsetHeight = node.offsetHeight;
        this.activeNode = node;
        this.activeNode.classList.add('umis-toolmaker__active');
      }
    },
    submitForm() {
      let { json } = this.beforeJSONEdit();
      const form = this.$refs.propsEditorRef.$refs[`${this.activeTab}FormRef`].$refs.form;
      form.validate(valid => {
        if (valid) {
          const model = form.model;
          this.$nextTick(() => {
            Object.assign(json, model);
          });
        }
      });
      this.drawerVisible = false;
    },
    onEditTabChange(name) {
      this.activeTab = name;
    },
    handleInactive() {
      this.activeTrack = '';
      this.activeNode && this.activeNode.classList.remove('umis-toolmaker__active');
      this.activeNode = '';
      this.activeJson = {};
      this.originApiProps = {};
      this.originNormalProps = {};
    },
    onEdit() {
      const misName =this.activeNode.getAttribute('track-id')
        .split('-')
        .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
        .join('');

      if (!this.$.appContext.components[misName]) {
        this.$message('找不到对应的渲染器');
        return;
      }
      const { json } = this.beforeJSONEdit();
      const mixinsList = this.$.appContext.components[misName].mixins || [];

      for (let i = 0; i < mixinsList.length; i++) {
        if (mixinsList[i].name === 'MixinProps') {
          this.originNormalProps = mixinsList[i].__props[0];
        }
        if (mixinsList[i].name === 'InitApi') {
          this.originApiProps = mixinsList[i].__props[0];
        }
      }

      this.activeJson = clonedeep(json);
      this.activeRenderer = misName;
      this.drawerVisible = true;
    },
    onBottom() {
      let { pJson, trackIndex } = this.beforeJSONEdit();
      if (trackIndex + 1 !== pJson.length) {
        this.swapOneInJSON(pJson, trackIndex + 1, trackIndex);
      } else {
        this.$message('已经处于底层，无法下移！');
      }
      this.handleInactive();
    },
    onTop() {
      let { pJson, trackIndex } = this.beforeJSONEdit();
      if (trackIndex !== 0) {
        this.swapOneInJSON(pJson, trackIndex, trackIndex - 1);
      } else {
        this.$message('已经处于顶层，无法上移！');
      }
      this.handleInactive();
    },
    onDelete() {
      let { pJson, trackIndex } = this.beforeJSONEdit();
      pJson.splice(trackIndex, 1);
      this.handleInactive();
    },
  }
}
</script>
