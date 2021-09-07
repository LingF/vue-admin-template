<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :title="title"
    @closed="handleClosed"
  >
    <el-form
      class="common-dialog-form-single"
      :model="form"
      label-width="100px"
      ref="form"
      :rules="rules"
    >
      <h2 class="form-module-title">角色信息</h2>
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in RoleStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime" v-if="type !== 'new'">
        <el-date-picker
          disabled
          v-model="form.createTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model.trim="form.description"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <h2 class="form-module-title">相关权限</h2>
      <el-form-item label="权限列表">
        <el-tree
          v-if="visible"
          node-key="id"
          show-checkbox
          default-expand-all
          check-strictly
          :check-on-click-node="true"
          :default-checked-keys="form.resourceIdList"
          ref="tree"
          :data="treeData"
          :props="defaultProps"
          @check="checkChange"
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
import arrToTree from 'array-to-tree'
import _cloneDeep from 'lodash/cloneDeep'
import { addRole, updateRole } from '@/api/account/role'
import { getPermissions } from '@/api/account/permission'
import { RoleStatus } from '@/views/account/status'
export default {
  data() {
    return {
      RoleStatus,
      visible: false,
      type: null,
      form: {},
      formBackup: {
        name: null,
        status: 1,
        description: null,
        resourceIdList: []
      },
      resourceList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        resourceIdList: [
          { required: true, message: '请选择权限', trigger: 'change,check' }
        ]
      }
    }
  },
  computed: {
    title() {
      if (this.type === 'new') {
        return '新增'
      } else if (this.type === 'edit') {
        return '编辑'
      } else {
        return '查看详情'
      }
    },
    disabled() {
      return this.type === 'readonly'
    },
    treeData() {
      const resourceList = this.resourceList.filter(item => {
        if (!item.roleIdList) {
          return true
        }
        if (
          item.roleIdList.find(roleId => {
            return roleId === this.form.id
          })
        ) {
          return true
        }
        return false
      })
      return arrToTree(resourceList, { parentProperty: 'pid', customID: 'id' })
    }
  },
  created() {
    getPermissions().then(res => {
      res.data.forEach(item => {
        if (item.belongRoles) {
          item.roleIdList = item.belongRoles.split(',').map(item => {
            return item - 0
          })
        }
      })
      this.resourceList = res.data
    })
  },
  methods: {
    open(type, data) {
      this.type = type
      const form = data ? _cloneDeep(data) : _cloneDeep(this.formBackup)
      for (let i = 0; i < form.resourceIdList.length; i++) {
        const id = form.resourceIdList[i]
        if (this.resourceList.some(node => node.pid === id)) {
          form.resourceIdList.splice(i, 1)
          i--
        }
      }
      this.form = form
      this.visible = true
      this.$refs.form && this.$refs.form.clearValidate()
    },
    getDataKeys(list) {
      const keys = []
      list.forEach(item => {
        keys.push(item.id)
        if (item.children && item.children.length) {
          const result = this.getDataKeys(item.children)
          if (result && result.length) {
            keys.push(...result)
          }
        }
      })
      return keys
    },
    checkChange(node, data) {
      const { checkedKeys } = data
      let checked = false
      if (checkedKeys.indexOf(node.id) > -1) {
        checked = true
      }
      const childrenKeys = node.children ? this.getDataKeys(node.children) : []
      if (checked) {
        checkedKeys.push(...childrenKeys)
      } else {
        childrenKeys.forEach(item => {
          const index = checkedKeys.findIndex(key => {
            return key === item
          })
          if (index > -1) {
            checkedKeys.splice(index, 1)
          }
        })
      }
      this.$refs.tree.setCheckedKeys(checkedKeys)
    },
    handleClosed() {
      this.form = _cloneDeep(this.formBackup)
    },
    cancel() {
      this.visible = false
    },
    submit() {
      const resourceIdList = this.$refs.tree
        .getCheckedNodes(false, true)
        .map(item => item.id)
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.form.resourceIdList = resourceIdList
        if (this.form.resourceIdList.length === 0) {
          return this.$message.error('请选择相关权限')
        }
        if (this.type === 'new') {
          addRole(_cloneDeep(this.form))
            .then(res => {
              this.$message.success('操作成功')
              this.$emit('success')
              this.visible = false
            })
            .catch(e => {
              this.$message.error(e.message)
            })
        } else {
          updateRole(_cloneDeep(this.form))
            .then(res => {
              this.$message.success('操作成功')
              this.$emit('success')
              this.visible = false
            })
            .catch(e => {
              this.$message.error(e.message)
            })
        }
      })
    }
  }
}
</script>
