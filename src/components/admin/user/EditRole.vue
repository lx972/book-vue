<template>
  <div>
    <el-dialog
      title="修改角色信息"
      @close="clear()"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input v-model="selectedRole.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.name_zh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditRole',
    data () {
      return {
        selectedRole: {
          id: '',
          name: '',
          name_zh: '',
        },
        perms: [],
        selectedPermsIds: [],
        menus: [],
        props: {
          label: 'name_zh',
          children: 'children',
        },
        selectedMenusIds: [],
        dialogFormVisible: false,
      }
    },
    methods: {
      //清空数据
      clear () {
        this.selectedRole.id = ''
        this.selectedRole.name = ''
        this.selectedRole.name_zh = ''
        this.perms = []
        this.selectedPermsIds = []
        this.menus = []
        this.selectedMenusIds = []
      },
      //加载所有的菜单
      loadAllMenus () {
        this.$axios.get('menus').then(resp => {
          if (resp.data.code === 200) {
            this.menus = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //加载所有的功能
      loadAllPermission () {
        this.$axios.get('permissions').then(resp => {
          if (resp.data.code === 200) {
            this.perms = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //加载该角色拥有菜单的id
      loadMenusIds () {
        this.$axios.get('menus/' + this.selectedRole.id).then(resp => {
          if (resp.data.code === 200) {
            //console.log(resp.data.data)
            this.selectedMenusIds = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //加载该角色拥有功能的id
      loadPermissionIds () {
        this.$axios.get('permissions/' + this.selectedRole.id).then(resp => {
          if (resp.data.code === 200) {
            this.selectedPermsIds = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //表单提交
      onSubmit () {
        this.$axios.put('roles', {
          id: this.selectedRole.id,
          name: this.selectedRole.name,
          name_zh: this.selectedRole.name_zh,
          pids: this.selectedPermsIds,
          mids: this.$refs.tree.getCheckedKeys(),
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
    }
  }
</script>

<style scoped>

</style>
