<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px"><AsideMenu></AsideMenu></el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
    import Header from "@/components/admin/Header";
    import AsideMenu from './AsideMenu'
    export default {
        name: "AdminIndex",
      components: {AsideMenu, Header}
    }
</script>

<style scoped>

</style>
