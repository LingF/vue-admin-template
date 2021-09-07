<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :title="title"
    @closed="handleClosed"
    width="1000px"
  >
    <el-form
      class="common-dialog-form-single"
      :model="form"
      label-width="100px"
      ref="form"
    >
      <el-form-item label="权限名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称"
          style="width: 300px"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入描述"
          :disabled="true"
          style="width: 80%"
        ></el-input>
      </el-form-item>

      <h2 class="form-module-title">请选择子权限</h2>
      <el-form-item label="权限列表">
        <el-tree
          v-if="visible"
          node-key="id"
          show-checkbox
          default-expand-all
          :check-strictly="true"
          :check-on-click-node="true"
          :default-checked-keys="form.targetParentId"
          ref="tree"
          :data="treeData"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit" v-if="type !== 'readonly'"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep'
import arrToTree from 'array-to-tree'
import { getPermissions, updateResourceBatch } from '@/api/account/permission'

export default {
  data() {
    return {
      visible: false,
      type: null,
      form: {},
      formBackup: {
        name: null,
        age: null,
        schoolName: null,
        type: null
      },
      resourceList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    title() {
      if (this.type === 'new') {
        return '新增'
      } else if (this.type === 'edit') {
        return '选择子权限'
      } else {
        return '查看详情'
      }
    },
    disabled() {
      return this.type === 'readonly'
    },
    treeData() {
      if (!this.form || !this.form.id) {
        return []
      }
      const resourceList = _cloneDeep(this.resourceList)
      this.setNodesDisabled(resourceList, this.form.id)
      return arrToTree(resourceList, { parentProperty: 'pid', customID: 'id' })
    }
  },
  methods: {
    open(type, data) {
      this.type = type
      this.form = data ? _cloneDeep(data) : _cloneDeep(this.formBackup)
      this.getPermissions().then(() => {
        this.visible = true
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    handleClosed() {
      this.form = _cloneDeep(this.formBackup)
    },
    cancel() {
      this.visible = false
    },
    submit() {
      const idList = this.$refs.tree.getCheckedNodes().map(item => item.id)
      if (!idList.length) {
        return this.$message.error('请选择子权限')
      }
      const params = {
        targetParentId: this.form.id,
        idList
      }
      updateResourceBatch(params)
        .then(res => {
          this.$message.success('操作成功')
          this.$emit('success')
          this.visible = false
        })
        .catch(e => {
          console.log(e)
          this.$message.error(e.message)
        })
    },
    getPermissions() {
      return getPermissions().then(res => {
        this.resourceList = res.data
      })
    },
    setNodesDisabled(resourceList, id) {
      const node = resourceList.find(item => item.id === id)
      if (node) {
        node.disabled = true
        if (node.pid) {
          this.setNodesDisabled(resourceList, node.pid)
        }
      }
    }
  }
}
</script>
