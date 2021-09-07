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
      <el-form-item label="权限名称" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入权限名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="code" prop="code">
        <el-input
          v-model.trim="form.code"
          placeholder="code"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="跳转页面" prop="value">
        <el-input
          v-model.trim="form.value"
          placeholder="由前端定义"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="接口配置">
        <el-button type="primary" @click="addAjaxUrl">新增配置</el-button>
        <div v-for="(item, index) in form.urlList">
          <el-input
            size="small"
            v-model.trim="item.url"
            placeholder=""
            style="width: 300px"
          ></el-input>
          <el-button size="small" type="danger" @click="deleteAjaxUrl(index)"
            >删除</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="icon">
        <el-input
          size="small"
          v-model.trim="form.icon"
          placeholder="请输入icon"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="专属角色" prop="value">
        <el-tooltip
          class="item"
          effect="dark"
          content="如果增加专属角色，则只有专属角色才能拥有此权限；如果没有专属角色，则所有角色都可拥有此权限；"
          placement="top-start"
        >
          <el-button type="primary" @click="addBelongRole"
            >新增专属角色</el-button
          >
        </el-tooltip>
        <div v-for="(item, index) in form.belongRolesList">
          <el-select v-model="item.roleId" size="small">
            <el-option
              v-for="role in roleList"
              :key="role.id"
              :value="role.id"
              :label="role.name"
            ></el-option>
          </el-select>
          <el-button size="small" type="danger" @click="deleteBelongRole(index)"
            >删除</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in PermissionStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model.trim="form.description"
          placeholder="请输入描述"
          style="width: 80%"
        ></el-input>
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
import { getRoleList } from '@/api/account/role'
import { addPermission, updatePermission } from '@/api/account/permission'
import { PermissionStatus } from '@/views/account/status'

import _cloneDeep from 'lodash/cloneDeep'
export default {
  data() {
    return {
      PermissionStatus,
      visible: false,
      type: null,
      form: {},
      roleList: [],
      formBackup: {
        status: 1,
        urlList: [],
        belongRolesList: []
      },
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入code', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    open(type, data, pid) {
      this.type = type
      this.form = data ? _cloneDeep(data) : _cloneDeep(this.formBackup)
      this.form.pid = pid || null
      if (this.type !== 'new') {
        const urlList = (this.form.ajaxUrls
          ? this.form.ajaxUrls.split(',')
          : []
        ).map(item => {
          return {
            url: item,
            key: this.getRandomString(15)
          }
        })
        this.$set(this.form, 'urlList', urlList)

        const belongRolesList = (this.form.belongRoles
          ? this.form.belongRoles.split(',')
          : []
        ).map(item => {
          return {
            roleId: item - 0,
            key: this.getRandomString(15)
          }
        })
        this.$set(this.form, 'belongRolesList', belongRolesList)
      } else {
      }
      this.visible = true
      this.$refs.form && this.$refs.form.clearValidate()
    },
    handleClosed() {
      this.form = _cloneDeep(this.formBackup)
    },
    cancel() {
      this.visible = false
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        let ajaxUrls = ''
        for (const item of this.form.urlList) {
          if (!item.url) {
            continue
          }
          if (ajaxUrls) {
            ajaxUrls = ajaxUrls + ',' + item.url
          } else {
            ajaxUrls = item.url
          }
        }
        this.form.ajaxUrls = ajaxUrls

        let belongRoles = ''
        for (const item of this.form.belongRolesList) {
          if (!item.roleId) {
            continue
          }
          if (belongRoles) {
            belongRoles = belongRoles + ',' + item.roleId
          } else {
            belongRoles = item.roleId
          }
        }
        this.form.belongRoles = belongRoles

        if (this.type === 'new') {
          addPermission(this.form)
            .then(res => {
              this.$message.success('操作成功')
              this.$emit('success')
              this.visible = false
            })
            .catch(e => {
              console.log(e)
              this.$message.error(e.message)
            })
        } else {
          updatePermission(this.form)
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
    },
    getRoleList() {
      getRoleList().then(res => {
        this.roleList = res.data
      })
    },
    addAjaxUrl() {
      const newItem = {
        url: '',
        key: this.getRandomString(15)
      }
      this.form.urlList.unshift(newItem)
    },
    deleteAjaxUrl(index) {
      this.form.urlList.splice(index, 1)
    },
    addBelongRole() {
      const newItem = {
        url: null,
        key: this.getRandomString(15)
      }
      this.form.belongRolesList.unshift(newItem)
    },
    deleteBelongRole(index) {
      this.form.belongRolesList.splice(index, 1)
    },
    getRandomString(len) {
      len = len || 32
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      const maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    }
  }
}
</script>
