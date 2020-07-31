<template>
  <div>
    <EditUser ref="editUserInfo" @onsubmit="updateInfo"></EditUser>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <BulkRegistration></BulkRegistration>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="users"
        stripe
        ref="multipleTable"
        :default-sort="{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :max-height="tght">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          fit>
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          fit>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          fit>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          sortable
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editUser(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import BulkRegistration from '@/components/admin/user/BulkRegistration'
  import EditUser from './EditUser'

  export default {
    name: 'UserProfile',
    components: {EditUser, BulkRegistration},
    data () {
      return {
        users: [],
      }
    },
    mounted: function () {
      //dom完成后加载用户信息
      this.loadUserInfo()
    },
    methods: {
      loadUserInfo () {
        this.$axios.get('/users').then(resp => {
          if (resp.data.code === 200) {
            this.users = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //取消选择
      toggleSelection () {
        this.$refs.multipleTable.clearSelection()
      },
      //编辑用户
      editUser (row) {
        this.$refs.editUserInfo.dialogFormVisible = true
        this.$refs.editUserInfo.selectedUser.id = row.id
        this.$refs.editUserInfo.selectedUser.username = row.username
        this.$refs.editUserInfo.selectedUser.name = row.name
        this.$refs.editUserInfo.selectedUser.phone = row.phone
        this.$refs.editUserInfo.selectedUser.email = row.email
        this.$refs.editUserInfo.loadAllRole()
        this.$refs.editUserInfo.loadRole()
      },
      //更新表格
      updateInfo () {
        this.loadUserInfo()
      },
    }
  }
</script>

<style scoped>

</style>
