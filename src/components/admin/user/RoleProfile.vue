<template>
  <div>
    <EditRole ref="editRoleInfo" @onsubmit="updateRole"></EditRole>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <role-create @onSubmit="listRoles()"></role-create>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="roles"
        stripe
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名"
          fit>
        </el-table-column>
        <el-table-column
          prop="name_zh"
          label="角色描述"
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="commitStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editRole(scope.row)">
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
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import EditRole from './EditRole'
  export default {
    name: 'RoleProfile',
    components: {EditRole},
    data(){
      return{
        roles:[],
      }
    },
    mounted(){
      this.loadRoles()
    },
    methods:{
      //加载所有角色
      loadRoles(){
        this.$axios.get('roles').then(resp=>{
          if (resp.data.code === 200) {
            this.roles=resp.data.data
            this.$message.success(resp.data.msg)
          }else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //是否启用该角色
      commitStatusChange(row){
        this.$axios.patch('updation/role/enabled', {
          id: row.id,
          enabled: row.enabled,
        }).then(resp => {
          if (resp.data.code === 200) {
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //编辑角色
      editRole(row){
        this.$refs.editRoleInfo.selectedRole.id=row.id
        this.$refs.editRoleInfo.selectedRole.name=row.name
        this.$refs.editRoleInfo.selectedRole.name_zh=row.name_zh
        this.$refs.editRoleInfo.dialogFormVisible=true
        this.$refs.editRoleInfo.loadAllMenus()
        this.$refs.editRoleInfo.loadMenusIds()
        this.$refs.editRoleInfo.loadAllPermission()
        this.$refs.editRoleInfo.loadPermissionIds()
      },
      //刷新表格
      updateRole(){
        this.loadRoles()
      },
    }
  }
</script>

<style scoped>

</style>
