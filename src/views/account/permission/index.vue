<template>
  <div class="page-container">
    <el-form inline>
      <el-form-item v-if="!tableData.length">
        <el-button type="primary" @click="addPermission(0)">新增权限</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      row-key="id"
      v-bind="$attrs"
      border
      ref="treeTable"
    >
      <el-table-column
        v-for="(column, index) in columns"
        :key="column.value"
        :label="column.text"
        :width="column.width"
        :prop="column.value"
      ></el-table-column>
      <el-table-column label="接口配置" min-width="300px">
        <template slot-scope="scope">
          <div v-if="scope.row.ajaxUrls">
            <div
              style="margin: 0; color: #409eff"
              v-for="url in scope.row.ajaxUrls.split(',')"
              :key="url"
            >
              {{ url }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success">生效</el-tag>
          <el-tag v-if="scope.row.status === 0" type="danger">冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320px" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-top"
            circle
            @click="moveUp(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-bottom"
            circle
            @click="moveDown(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            @click="editPermission(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deletePermission(scope.row)"
            >删除</el-button
          >
          <el-dropdown @command="batchOperation" trigger="click">
            <el-button size="mini"
              >其他<i class="el-icon-arrow-down el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type: 'add', data: scope.row.id }"
                >新增子权限</el-dropdown-item
              >
              <el-dropdown-item :command="{ type: 'add', data: scope.row.pid }"
                >新增同级权限</el-dropdown-item
              >
              <el-dropdown-item
                :command="{ type: 'chooseSonPermission', data: scope.row }"
                >选择子权限（把其他权限移动到该权限中）</el-dropdown-item
              >
              <el-dropdown-item
                :command="{ type: 'setAsRoot', data: scope.row }"
                >设置为根节点（把该节点移动到最外层）</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <slot />
    </el-table>

    <detail-modal
      ref="choosePermission"
      @success="getPermissions"
    ></detail-modal>
    <detail-modal-single
      ref="permissionDetail"
      @success="getPermissions"
    ></detail-modal-single>
  </div>
</template>
<script>
import detailModal from './components/detail-modal'
import detailModalSingle from './components/detail-modal-single'
import {
  getPermissions,
  getPermissionDetail,
  dragAndDropResource,
  deletePermission
} from '@/api/account/permission'
import arrToTree from 'array-to-tree'

export default {
  components: {
    detailModal,
    detailModalSingle
  },
  data() {
    return {
      columns: [
        {
          text: '权限名称',
          value: 'name',
          width: 200
        },
        {
          text: 'ID',
          value: 'id',
          width: 100
        },
        {
          text: 'code',
          value: 'code',
          width: 180
        },
        {
          text: '跳转页面',
          value: 'value',
          width: 200
        },
        {
          text: 'icon',
          value: 'icon',
          width: 150
        }
      ],
      draggable: false,
      tableData: [],
      dataList: []
    }
  },
  created() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      getPermissions()
        .then(res => {
          this.dataList = res.data
          this.tableData = arrToTree(res.data, {
            parentProperty: 'pid',
            customID: 'id'
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    addPermission(pid) {
      this.$refs.permissionDetail.open('new', null, pid)
    },
    deletePermission(item) {
      this.$confirm('确认删除？').then(() => {
        deletePermission({ id: item.id }).then(() => {
          this.$message.success('操作成功')
          this.getPermissions()
        })
      })
    },
    batchOperation(obj) {
      if (obj.type === 'add') {
        this.addPermission(obj.data)
      } else if (obj.type === 'chooseSonPermission') {
        this.$refs.choosePermission.open('edit', obj.data)
      } else if (obj.type === 'setAsRoot') {
        if (!obj.data.pid) {
          return this.$message.error('已经是根节点了')
        }
        dragAndDropResource({
          id: obj.data.id,
          targetParentId: 0,
          targetUpId: null,
          targetDownId: this.tableData[0].id // 移动到第一个位置
        }).then(() => {
          this.$message.success('操作成功')
          this.getPermissions()
        })
      }
    },
    editPermission(item) {
      getPermissionDetail({
        id: item.id
      }).then(res => {
        this.$refs.permissionDetail.open('edit', res.data)
      })
    },
    moveUp(data) {
      const brothers = this.dataList.filter(item => {
        return item.pid === data.pid
      })
      const parent = data.pid
        ? this.dataList.find(item => item.id === data.pid)
        : null
      const index = brothers.findIndex(item => {
        return item.id === data.id
      })
      if (index === 0) {
        return this.$message.error('不能再向上移动了')
      } else {
        const params = {
          id: data.id,
          targetParentId: parent ? parent.id : null,
          targetUpId: null,
          targetDownId: brothers[index - 1].id
        }
        dragAndDropResource(params)
          .then(() => {
            this.$message.success('操作成功')
            this.getPermissions()
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    moveDown(data) {
      const brothers = this.dataList.filter(item => {
        return item.pid === data.pid
      })
      const parent = data.pid
        ? this.dataList.find(item => item.id === data.pid)
        : null
      const index = brothers.findIndex(item => {
        return item.id === data.id
      })
      if (index === brothers.length - 1) {
        return this.$message.error('不能再向下移动了')
      } else {
        const params = {
          id: data.id,
          targetParentId: parent ? parent.id : null,
          targetUpId: brothers[index + 1].id,
          targetDownId: null
        }
        dragAndDropResource(params)
          .then(() => {
            this.$message.success('操作成功')
            this.getPermissions()
            this.$nextTick(() => {
              const rows = document.querySelectorAll('.el-table__expand-icon')
              rows.forEach(item => {
                item.click()
              })
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
}
</script>
