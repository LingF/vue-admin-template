---
to: src/views/<%= path %>/<%= name %>/index.vue
unless_exists: true
---

<template>
  <div class="app-container">
    <el-form inline class="common-search-form">
      <el-form-item>
        <el-select v-model="searchData.companyId" placeholder="保险公司" clearable filterable>
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchData.date"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchData.name" placeholder="姓名" clearable style="width: 200px;" />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchData.dateRange"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>

      <el-form-item>
        <el-cascader
          v-model="searchData.departmentId"
          placeholder="所属机构"
          clearable
          :options="departmentList"
          :props="departmentProps"
          :change-on-select="true"
        />
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
        <el-button type="primary" @click="openDetailModal('new')">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport">导出Excel</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="search-form-btn"
          :on-success="handleUploadSuccess"
          :with-credentials="true"
          :on-error="handleUploadError"
          name="file"
          :action="uploadUrl"
          :show-file-list="false"
        >
          <el-button type="primary">导入模板</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" width="50px" />
      <el-table-column prop="id" label="ID" min-width="150px" />
      <el-table-column prop="name" label="姓名" min-width="150px" />
      <el-table-column prop="createTime" label="创建时间" min-width="150px">
        <template slot-scope="scope">{{ scope.row.createTime | parseTime }}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openDetailModal('readonly', scope.row)">查看详情</el-button>
          <el-button size="mini" type="primary" @click="openDetailModal('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

    <% if (modal) { %><detail-modal-single ref="detailModal" @success="handleSuccess" /><% } %><% if (!modal) { %><detail-modal ref="detailModal" @success="handleSuccess" /><% } %>
  </div>
</template>
<script>
import { getDetail, getTableList } from '@/api'
<% if (modal) { %>import detailModalSingle from './components/detail-modal-single'<% } %><% if (!modal) { %>import detailModal from './components/detail-modal'<% } %>

export default {
  components: {
    <% if (modal) { %>detailModalSingle<% } %><% if (!modal) { %>detailModal<% } %>
  },
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/policy/analysisPolicyExcel',
      companyList: [],
      departmentProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      departmentList: [
        {
          fullAddress: '内蒙古自治区呼和浩特市土默特左旗计量大厦',
          hasNode: true,
          id: 1,
          level: 1,
          levelName: '总公司',
          name: '微易',
          parentId: 0,
          provinceName: '内蒙古自治区',
          children: [
            {
              fullAddress: '浙江省杭州市下城区庆春路118号嘉德广场702室',
              hasNode: true,
              id: 65,
              level: 2,
              levelName: '分公司',
              name: '微易保险经纪有限公司杭州分公司',
              parentId: 1,
              provinceName: '浙江省'
            }
          ]
        }
      ],
      searchData: {
        companyId: null,
        date: null,
        name: null,
        dateRange: [],
        departmentId: []
      },
      pageOptions: {
        pageSize: 20,
        pageNum: 1,
        total: 1
      },
      tableData: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleUploadSuccess(res) {
      if (res.success) {
        this.$message.success('上传成功')
      }
    },
    handleUploadError(err) {
      this.$message.error(err.message)
    },
    openDetailModal(type, item) {
      if (type === 'new') {
        this.$refs.detailModal.open(type)
        return
      }
      getDetail(item.id).then(res => {
        this.$refs.detailModal.open(type, res.data)
      })
    },
    handleSuccess() {
      this.handleSearch(this.pageOptions.pageNum)
    },
    handleExport() {
      const params = []
      for (const key in this.searchData) {
        if (key === 'dateRange') {
          const dateRange = this.searchData.dateRange
          if (dateRange) {
            params.push(`startDatetime=${dateRange[0]}`)
            params.push(`endDatetime=${dateRange[1]}`)
          }
        } else if (key === 'departmentId') {
          const departmentId = this.searchData.departmentId
          if (departmentId.length) {
            params.push(
              `departmentId=${this.searchData.departmentId.slice(-1)[0]}`
            )
          }
        } else if (this.searchData[key] || this.searchData[key] === 0) {
          const value = this.searchData[key]
          params.push(`${key}=${value}`)
        }
      }
      const paramsStr = params.join('&')
      const url = `${process.env.BASE_API}/org/course/export?${paramsStr}`
      window.location.href = url
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
    handleReset() {
      this.searchData = {
        companyId: null,
        date: null,
        name: null,
        dateRange: [],
        departmentId: []
      }
      this.handleSearch()
    },
    handleCurrentChange(page) {
      this.handleSearch(page)
    },
    handleSearch(page = 1) {
      this.pageOptions.pageNum = page
      const { dateRange, departmentId, ...params } = this.searchData
      const deptId = departmentId.length ? departmentId.slice(-1)[0] : null
      const data = {
        startTime: dateRange ? dateRange[0] : null,
        endTime: dateRange ? dateRange[1] : null,
        departmentId: deptId,
        pageSize: this.pageOptions.pageSize,
        pageNum: this.pageOptions.pageNum,
        ...params
      }
      getTableList(data).then(res => {
        this.tableData = res.data.list
        this.pageOptions.total = res.data.totalRow
      })
    }
  }
}
</script>
<style lang="scss">
</style>
