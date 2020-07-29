<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    import Header from "@/components/admin/Header";
    export default {
        name: "AdminIndex",
      components: {Header}
    }
</script>

<style scoped>

</style>
