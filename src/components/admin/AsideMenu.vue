<template>
  <el-menu
    default-active="2"
    class="el-menu-admin"
    router>
    <el-submenu index="1" v-for="(menu,i) in adminMenu" :key="i" :index="(i).toString()">
      <template slot="title">
        <i :class="menu.icon_cls"></i>
        <span>{{menu.name_zh}}</span>
      </template>
      <el-menu-item v-for="children in menu.children" :key="children.path" :index="children.path">
        {{children.name_zh}}
        <i :class="children.icon_cls"></i>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'AsideMenu',
    computed: {
      adminMenu () {
        //加载菜单
        return this.$store.state.adminMenu
      }
    },
  }
</script>

<style scoped>
  .el-menu-admin {
    border-radius: 5px;
    height: 100%;
  }
</style>
