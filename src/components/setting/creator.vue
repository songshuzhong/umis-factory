<template>
  <el-card class="umis-setting__card-margin">
    <div slot="header" class="umis-setting__header">
      <span>新建项目|页面</span>
      <el-button plain size="mini" type="primary" @click="creatorDialog = true">
        新建
      </el-button>
    </div>
    <el-table :data="projectList">
      <el-table-column prop="projectName" label=" 项目名" width="140">
      </el-table-column>
      <el-table-column prop="projectIcon" label="图标" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-dialog :visible.sync="creatorDialog">
      <el-form v-loading="apiLoading" :model="data" label-width="80px">
        <el-form-item label="英文名称">
          <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="data.label" />
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="data.type">
            <el-radio label="project">项目</el-radio>
            <el-radio label="page">页面</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="data.type && data.type === 'page'" label="所属项目">
          <el-select v-model="data.projectId" placeholder="请选择所属项目">
            <template v-for="(item, index) in projectList" :key="index">
              <el-option :label="item.projectName" :value="item.projectId" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="data.icon" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="data.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="creatorDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  Form as ElForm,
  FormItem as ElFormItem,
  Input as ElInput,
  Radio as ElRadio,
  RadioGroup as ElRadioGroup,
  Select as ElSelect,
  Option as ElOption,
  Button as ElButton,
  Card as ElCard,
  Dialog as ElDialog,
  Table as ElTable,
  TableColumn as ElTableColumn,
} from 'element-ui';

export default {
  name: 'MisCreator',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElRadio,
    ElRadioGroup,
    ElSelect,
    ElOption,
    ElCard,
    ElDialog,
    ElButton,
    ElTable,
    ElTableColumn,
  },
  data() {
    return {
      data: {},
      projectList: [],
      apiLoading: false,
      creatorDialog: false,
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      this.$api
        .slientApi()
        .get('/api/project')
        .then(res => {
          const { rows } = res.data;
          this.projectList = rows;
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleCreate() {
      this.apiLoading = true;
      this.$api
        .slientApi()
        .post(`/api/${this.data.type}`, this.data)
        .then(res => {
          console.log(res);
          this.creatorDialog = false;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.apiLoading = false;
        });
    },
  },
};
</script>
