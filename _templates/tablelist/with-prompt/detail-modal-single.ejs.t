---
to: "<%= modal ? `src/views/${path}/${name}/components/detail-modal-single.vue` : null %>"
unless_exists: true
---
<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :title="title"
    @closed="handleClosed"
  >
    <el-form ref="form" class="common-dialog-form-single" :model="form" label-width="100px">
      <h2 class="form-module-title">标题一</h2>
      <el-form-item label="id" prop="id" required>
        <el-input v-model.trim="form.id" placeholder="请输入id" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="姓名" prop="name" required>
        <el-input v-model.trim="form.name" placeholder="请输入姓名" :disabled="disabled" />
      </el-form-item>

      <h2 class="form-module-title">标题二</h2>
      <el-form-item label="年龄" prop="age" required>
        <el-input v-model.trim="form.age" placeholder="请输入年龄" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="性别" prop="gender" required>
        <el-select v-model.trim="form.gender" placeholder="请选择性别" :disabled="disabled">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="type !== 'readonly'" type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import _cloneDeep from 'lodash/cloneDeep'
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
  methods: {
    open(type, data) {
      this.type = type
      this.form = data ? _cloneDeep(data) : _cloneDeep(this.formBackup)
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
        this.$emit('success')
        this.visible = false
      })
    }
  }
}
</script>
<style lang="scss">
</style>
