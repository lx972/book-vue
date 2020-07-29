<template>
  <div id="bk">
    <el-form ref="form" :model="form" label-width="80px" class="login-container">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名：">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密 码：">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      login() {
        //console.log(this.$store.state)
        this.$axios.post('/login', {
          username: this.form.username,
          password: this.form.password
        })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$message.success(successResponse.data.msg);
              // var data = this.loginForm
              this.$store.commit('login', this.form)
              var path = this.$route.query.redirect
              console.log(path)
              this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
            } else {
              this.$message.error(successResponse.data.msg)
            }
          })
          .catch(errorResponse => {
            this.$message.warn(errorResponse.data.msg)
          });
      }
    }
  }
</script>

<style scoped>
  #bk {
    background: url("../assets/bk.jpg");
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
