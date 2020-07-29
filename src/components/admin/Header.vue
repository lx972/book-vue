<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/img/icon/icon2.png" alt="" width="55px" style="float: left;margin-top: -5px;">
    </a>
    <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">白  卷</span>
    <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>
  </el-card>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      logout() {
        this.$axios.get("/logout")
          .then(resp => {
            if (resp.data.code === 200) {
              this.$message.success(resp.data.msg)
              //去登陆页面
              this.$router.push("/login");
            } else {
              this.$message.error(resp.data.msg)
            }
          })
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }
  .el-icon-switch-button {
    cursor: pointer;
    outline:0;
  }
</style>
