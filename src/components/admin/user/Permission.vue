<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="desc_"
      label="描述">
    </el-table-column>
    <el-table-column
      prop="url"
      label="url"
      width="100">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.status"
          active-text="启用"
          inactive-text="禁用"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="commitStatusChange(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'Permission',
    data () {
      return {
        tableData: [],
        rid: ''
      }
    },

    methods: {
      //加载该角色拥有功能
      loadPermission () {
        this.$axios.get('permissions/table/' + this.rid).then(resp => {
          if (resp.data.code === 200) {
            this.tableData = resp.data.data
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      },
      //是否启用该功能
      commitStatusChange (row) {
        this.$axios.put('update/role/permission/' + this.rid, {
          id: row.id,
          status: row.status
        }).then(resp => {
          if (resp.data.code === 200) {
            this.$message.success(resp.data.msg)
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
