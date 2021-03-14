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
        v-if="schema"
        :schema="schema"
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
      append-to-body
      destroy-on-close
    >
      <div class="umis-toolmaker__drawer__content">
        <el-form :model="formData">
          <el-form-item label="活动名称">
            <el-input v-model="formData.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="umis-toolmaker__drawer__footer">
          <el-button @click="drawerVisible = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="loading"
          >
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </section>
</template>
<script>
import { ElButtonGroup, ElButton, ElDrawer, ElForm, ElFormItem, ElInput } from 'element-plus';
import MisSchema from './container/schema';
import componentMap from '../utils/map';

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
      schema: '',
      activeNode: '',
      activeTrack: '',
      offsetTop: '',
      offsetLeft: '',
      offsetWidth: '',
      offsetHeight: '',
      drawerVisible: false,
      editableProps: [],
      formData: {}
    }
  },
  mounted() {
    this.schema = window.UMIS.pageSchema;
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
    dragStart(e) {
      let componentName = e.target.getAttribute('data-name');
      let info = {
        renderer: componentName,
      };
      e.dataTransfer.setData('info', JSON.stringify(info));
    },
    dragOver(e) {
      e.preventDefault();
    },
    drop(e) {
      let info = JSON.parse(e.dataTransfer.getData('info'));
      this.schema.body.push(info);
    },
    findMisComponent(node) {
      while (node && !node.classList.contains('umis-toolmaker__container') && !node.getAttribute('track')) {
        node = node.parentNode;
      }
      return node;
    },
    handleInactive() {
      this.activeTrack = '';
      this.activeNode.classList.remove('umis-toolmaker__active');
      this.activeNode = '';
    },
    onEdit() {
      const misName = this.activeNode.getAttribute('renderer')
          .split('-')
          .map(kebab => kebab.charAt(0).toUpperCase() + kebab.slice(1))
          .join('');
      if (!this.$.appContext.components[misName]) {
        this.$message('找不到对应的渲染器');
        return;
      }
      this.editableProps = this.$.appContext.components[misName].props.map(item => item.required);
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
    beforeJSONEdit() {
      let trackList = this.activeTrack.split('/');
      trackList = trackList.slice(2);
      return this.findOneInJSON(this.schema, trackList);
    },
    swapOneInJSON(json, trackIndex, targetIndex) {
      json[trackIndex] = json.splice(targetIndex, 1, json[trackIndex])[0];
    },
    findOneInJSON(json, tracks, pJson, trackIndex) {
      const track = tracks.shift();
      let index = trackIndex;
      if (tracks.length === 1) {
        index = track;
      }
      if (!track) {
        return { json, pJson, trackIndex: Number(trackIndex) };
      }
      if (track.startsWith('mis-') && json.renderer === track) {
        return this.findOneInJSON(json, tracks, pJson, index);
      }
      if (json[track]) {
        return this.findOneInJSON(json[track], tracks, json, index)
      }
    }
  }
}
</script>
