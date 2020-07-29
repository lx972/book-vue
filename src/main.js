// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI)

// 设置反向代理，前端请求默认发送到 http://localhost:8082/
axios.defaults.baseURL = 'http://localhost:8082/api'

//带上cookie
axios.defaults.withCredentials = true

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios


Vue.config.productionTip = false

//访问每一个路由前调用
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        //验证该sessionid是否有权限访问该路由
        axios.get("/authentication")
          .then(resp => {
            if (resp.data.code === 302) {
              alert("您还未登录，请先登录")
              next({
                path: 'login',
                query: {redirect: to.fullPath}
              })
            }else {
              next()
            }

          })
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/*// 在封装axios的文件中添加拦截器
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {

    config.headers.authorization = localStorage.getItem("sessionId")

    return config
  },
  error => {
    return Promise.reject(error)
  })*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})



