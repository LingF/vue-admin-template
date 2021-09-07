<template>
  <div class="page-container">
    <el-form inline class="common-search-form">
      <el-form-item>
        <el-input v-model="searchData.name" placeholder="角色名称" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchData.status" clearable placeholder="状态">
          <el-option
            v-for="item in RoleStatus"
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
        <el-button type="primary" @click="openDetailModal('new')"
          >新增角色</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="id" label="角色id" />
      <el-table-column label="创建时间" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="角色状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success">生效</el-tag>
          <el-tag v-else-if="scope.row.status === 0" type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" fixed="right" width="100px">
        <template slot-scope="scope">
          <!--<el-button size="mini" type="primary" @click="openDetailModal('readonly', scope.row)">查看详情</el-button>-->
          <el-button
            size="mini"
            type="primary"
            @click="openDetailModal('edit', scope.row)"
            >编辑</el-button
          >
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

    <detail-modal-single ref="detailModalSingle" @success="handleSuccess" />
  </div>
</template>
<script>
import detailModalSingle from './components/detail-modal-single'
import { getRolePage, getRole } from '@/api/account/role'
import { RoleStatus } from '@/views/account/status'

export default {
  components: {
    detailModalSingle
  },
  data() {
    return {
      RoleStatus,
      pageOptions: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      },
      searchData: {
        companyId: null,
        date: null,
        name: null,
        dateRange: [],
        departmentId: []
      },
      tableData: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleCurrentChange(page) {
      this.handleSearch(page)
    },
    handleReset() {
      this.searchData = {
        companyId: null,
        date: null,
        name: null,
        dateRange: [],
        departmentId: []
      }
      this.handleSearch(1)
    },
    handleSearch(page = 1) {
      this.pageOptions.pageNum = page
      const data = {
        ...this.searchData,
        pageSize: this.pageOptions.pageSize,
        pageNum: this.pageOptions.pageNum
      }
      getRolePage(data).then(res => {
        this.tableData = res.data.list
        this.pageOptions.total = res.data.totalRow
      })
    },
    openDetailModal(type, item) {
      if (type === 'new') {
        this.$refs.detailModalSingle.open(type)
        return
      }
      getRole({ id: item.id }).then(res => {
        this.$refs.detailModalSingle.open(type, res.data)
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
    }
  }
}
</script>
