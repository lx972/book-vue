import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AppIndex from '@/components/Home/AppIndex'
import LibraryIndex from '@/components/library/LibraryIndex'
import AdminIndex from "@/components/admin/AdminIndex";
import TextEdit from '../components/jotter/TextEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问,重定向到index页面
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/library',
          name: 'LibraryIndex',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/jotter',
          name: 'TextEdit',
          component: TextEdit,
          meta:{
            requireAuth:true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'AdminIndex',
      component: AdminIndex,
      meta:{
        requireAuth:true
      }
    },

  ]
})
