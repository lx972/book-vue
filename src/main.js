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
    //先判断是否已经登录，已登录才能访问该路径
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        //验证该sessionid是否有权限访问该路由
        axios.get('/authentication')
          .then(resp => {
            next()
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

    //随后以admin开头的路径加载菜单
    if (store.state.user.username && to.path.startsWith('/admin')) {
      initAdminMenu()
    }
  }
)

//初始化加载后台菜单
const initAdminMenu = () => {
  if (store.state.adminMenu.length > 0) {
    return
  }
  axios.get('/menus')
    .then(resp => {
      if (resp.data.code === 200) {
        var routers = fmtRouter(resp.data.data)
        console.log(routers)
        router.addRoutes(routers)
        store.commit('loadMenu', routers)
        Vue.prototype.$message.success(resp.data.msg)
      }
    })
}

const fmtRouter = (menus) => {
  let routers = []

  menus.forEach(menu => {
    if (menu.children) {
      menu.children = fmtRouter(menu.children)
    }
    let children = {
      id: menu.id,
      path: menu.path,
      name: menu.name,
      name_zh: menu.name_zh,
      icon_cls: menu.icon_cls,
      parent_id: menu.parent_id,
      component: resolve => {
        require(['@/components/admin/' + menu.component + '.vue'], resolve)
      },
      children: menu.children
    }
    routers.push(children)
  })
  return routers
}

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function (response) {
    // 处理响应数据
    if (response.data.code === 302) {
      Vue.prototype.$message.error(response.data.msg)
      router.replace('/login')
    }
    return response
  },
  function (error) {
    // 处理响应失败
    return Promise.reject(error)
  })

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



