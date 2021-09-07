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
      <el-form-item label="登录账号" prop="userName">
        <el-input
          v-model.trim="form.userName"
          placeholder="请输入登录账号"
          :disabled="type !== 'new'"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!$store.getters.useSSO">
        <el-input
          v-model.trim="form.password"
          placeholder="请输入密码"
          type="password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入姓名"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          v-model.trim="form.mobile"
          placeholder="请输入手机号码"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleIdList">
        <el-select
          v-model="form.roleIdList"
          multiple
          filterable
          placeholder="请选择角色"
          :disabled="disabled"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号状态" prop="status">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          :disabled="disabled"
        >
          <el-option
            v-for="item in AccountStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="form.remark"
          placeholder="请输入备注"
          :disabled="disabled"
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
import _cloneDeep from 'lodash/cloneDeep'
import { validatePassword } from '@/utils/validate'
import { addUser, updateUser } from '@/api/account/account'
import { getRoleList } from '@/api/account/role'
import { AccountStatus } from '@/views/account/status'

function checkPassword(rule, password, cb) {
  if (validatePassword(password)) {
    cb()
  } else {
    cb(new Error('密码至少由8位数字字母或下划线组成'))
  }
}

const passwordRule = [
  {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  {
    validator: checkPassword,
    trigger: 'blur'
  }
]

export default {
  data() {
    return {
      AccountStatus,
      visible: false,
      type: null,
      roleList: [],
      form: {
        roleIdList: []
      },
      formBackup: {
        mobile: null,
        password: null,
        remark: null,
        roleIdList: [],
        status: 1,
        userName: null,
        name: null,
        id: null
      },
      rules: {
        password: passwordRule,
        roleIdList: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]
      },
      passwordForm: {
        password: '',
        confirmPassword: ''
      },
      pdRules: {
        password: passwordRule,
        confirmPassword: passwordRule.concat([
          {
            validator: (rl, val, cb) => {
              if (val !== this.passwordForm.password) {
                cb(new Error('确认密码和密码不同'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          }
        ])
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
    this.getRoles()
  },
  methods: {
    open(type, data) {
      this.type = type
      this.form = data ? _cloneDeep(data) : _cloneDeep(this.formBackup)
      this.form.roleIdList = this.form.roleIdList || []
      this.visible = true
      this.$refs.form && this.$refs.form.clearValidate()
    },
    handleClosed() {
      this.form = _cloneDeep(this.formBackup)
    },
    cancel() {
      this.visible = false
    },
    getRoles() {
      getRoleList().then(res => {
        this.roleList = res.data
      })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        const form = JSON.parse(JSON.stringify(this.form))
        if (this.type === 'new') {
          delete form.id
          addUser(form).then(res => {
            this.$message.success('操作成功')
            this.$emit('success')
            this.visible = false
          })
        } else {
          delete form.password
          updateUser(form).then(res => {
            this.$message.success('操作成功')
            this.$emit('success')
            this.visible = false
          })
        }
      })
    }
  }
}
</script>
