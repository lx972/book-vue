<template>
  <el-dialog
    title="修改用户信息"
    @close="clear()"
    :visible.sync="dialogFormVisible">
    <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
      <el-form-item label="用户名" label-width="120px" prop="username">
        <label>{{selectedUser.username}}</label>
      </el-form-item>
      <el-form-item label="真实姓名" label-width="120px" prop="name">
        <el-input v-model="selectedUser.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="120px" prop="phone">
        <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="120px" prop="email">
        <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px" prop="password">
        <el-button type="warning" @click="resetPassword()">重置密码</el-button>
      </el-form-item>
      <el-form-item label="角色分配" label-width="120px" prop="roles">
        <el-checkbox-group v-model="selectedUser.rids">
          <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.name_zh}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EditUser',
    data () {
      return {
        selectedUser: {
          id: '',
          username: '',
          name: '',
          phone: '',
          email: '',
          rids: [],
        },
        roles: [],
        dialogFormVisible: false,
      }
    },
    methods: {
      //加载所有角色
      loadAllRole () {
        this.$axios.get('roles').then(resp => {
          if (resp.data.code === 200) {
            this.roles = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //当前用户角色
      loadRole () {
        this.$axios.get('roleId/' + this.selectedUser.id).then(resp => {
          if (resp.data.code === 200) {
            this.selectedUser.rids = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //修改
      onSubmit () {
        this.$axios.put('updation/user/role', {
          id: this.selectedUser.id,
          username: this.selectedUser.username,
          name: this.selectedUser.name,
          phone: this.selectedUser.phone,
          email: this.selectedUser.email,
          rids: this.selectedUser.rids,
        }).then(resp => {
          if (resp.data.code === 200) {
            this.$message.success(resp.data.msg)
            this.$emit("onsubmit")
            this.dialogFormVisible = false
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //清空
      clear () {
        this.selectedUser.id = '',
          this.selectedUser.username = '',
          this.selectedUser.name = '',
          this.selectedUser.phone = '',
          this.selectedUser.email = '',
          this.selectedUser.rids = [],
          this.roles = []
      },
      //重置密码
      resetPassword () {
        this.$confirm('此操作将重置密码为 123, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
          this.$axios.patch('updation/user/resetPassword', {
            id: this.selectedUser.id,
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success(resp.data.msg)
            } else {
              this.$message.error(resp.data.msg)
            }
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>
