<template>
  <el-container>
    <el-aside width="500px">
      <left-menu></left-menu>
    </el-aside>
    <el-main>
      <quick-nav></quick-nav>
      <carousel id="header-div"></carousel>
      <update-card id="update-card"></update-card>
      <slogan id="slogan"></slogan>
      <el-footer>
        <about  id="about"></about>
      </el-footer>
    </el-main>

  </el-container>
</template>

<script>
  import LeftMenu from "@/components/Home/LeftMenu";
  import UpdateCard from "@/components/Home/UpdateCard";
  import Slogan from "@/components/Home/Slogan";
  import QuickNav from "@/components/Home/QuickNav";
  import Carousel from "@/components/Home/Carousel";
  import About from "@/components/common/About";

  export default {
    name: "AppIndex",
    components: {About, Carousel, QuickNav, Slogan, UpdateCard, LeftMenu}
  }
</script>

<style scoped>

</style>
