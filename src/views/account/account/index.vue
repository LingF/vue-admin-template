<template>
  <div class="page-container">
    <el-form inline class="common-search-form">
      <el-form-item>
        <el-input v-model="searchData.userName" placeholder="登录账号" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.name" placeholder="姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchData.mobile" placeholder="手机号" clearable />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchData.status" clearable placeholder="状态">
          <el-option
            v-for="item in AccountStatus"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleReset()">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearch()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="openDetailModal('new')">新增账号</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" min-width="50" />
      <el-table-column prop="userName" label="登录账号" min-width="150" />
      <el-table-column prop="name" label="姓名" width="130" />
      <el-table-column label="角色" min-width="200">
        <template v-if="scope.row.roleIdList" slot-scope="scope">
          <el-tag
            v-for="roleId in scope.row.roleIdList"
            :key="roleId"
            size="mini"
            class="role-tag"
          >{{ roleId | roleNameFilter(roles) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号码" min-width="130" />
      <el-table-column label="创建时间" min-width="180">
        <template slot-scope="scope">{{ scope.row.createTime | parseTime }}</template>
      </el-table-column>
      <el-table-column label="账号状态" min-width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success">生效</el-tag>
          <el-tag v-if="scope.row.status === 0" type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <!--<el-button size="mini" type="primary" @click="openDetailModal('readonly', scope.row)">查看详情</el-button>-->
          <el-button size="mini" type="primary" @click="openDetailModal('edit', scope.row)">编辑</el-button>
          <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="pageOptions.total"
      background
      layout="prev, pager, next, jumper"
      :current-page="pageOptions.pageNum"
      :page-size="pageOptions.pageSize"
      :total="pageOptions.total"
      @current-change="handleCurrentChange"
    />

    <detail-modal ref="detailModal" @success="handleSuccess" />
  </div>
</template>
<script>
import { getUserPage, getUser } from '@/api/account/account'
import { getRoleList } from '@/api/account/role'
import { AccountStatus } from '@/views/account/status'
import detailModal from './components/detail-modal'

export default {
  components: {
    detailModal
  },
  filters: {
    roleNameFilter(id, list) {
      const item = list.find(item => {
        return item.id === id
      })
      return item ? item.name : id
    }
  },
  data() {
    return {
      AccountStatus,
      pageOptions: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      searchData: {},
      tableData: [],
      roles: []
    }
  },
  created() {
    this.handleSearch()
    this.getRoles()
  },
  methods: {
    handleCurrentChange(page) {
      this.handleSearch(page)
    },
    handleReset() {
      this.searchData = {}
      this.handleSearch(1)
    },
    handleSearch(page = 1) {
      this.pageOptions.pageNum = page
      const data = {
        ...this.searchData,
        pageSize: this.pageOptions.pageSize,
        pageNum: this.pageOptions.pageNum
      }
      getUserPage(data).then(res => {
        this.tableData = res.data.list
        this.pageOptions.total = res.data.totalRow
      })
    },
    openDetailModal(type, item) {
      if (type === 'new') {
        this.$refs.detailModal.open(type)
        return
      }
      getUser({ id: item.id }).then(res => {
        this.$refs.detailModal.open(type, res.data)
      })
    },
    handleSuccess() {
      this.handleSearch(this.pageOptions.pageNum)
    },
    handleExport() {
      this.$message.success('导出数据')
    },
    handleUploadSuccess(res) {
      if (res.success) {
        this.$message.success('上传成功')
      }
    },
    handleUploadError(err) {
      this.$message.error(err.message)
    },
    handleDelete() {
      this.$confirm('确认删除?')
        .then(() => {
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    getRoles() {
      getRoleList().then(res => {
        this.roles = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.role-tag {
  margin-right: 10px;
}
</style>
