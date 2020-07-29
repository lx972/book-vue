<template>
  <el-menu
    :default-active="currentPath"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.index">{{item.text}}</el-menu-item>

      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">White Jotter - Your Mind Palace</span>
      <el-input
        placeholder="快速搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 12px;right: 18%"
        v-model="keywords">
      </el-input>

  </el-menu>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {
        navList:[
          {index:'/index',text:'首页'},
          {index:'/jotter',text:'笔记本'},
          {index:'/library',text:'图书馆'},
          {index:'/admin',text:'后台管理中心'}
        ],
        keywords:''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      currentPath () {
        console.log(this.$route.path)
        var x = this.$route.path.indexOf('/', 1)
        if (x !== -1) {
          return this.$route.path.substring(0, x)
        } else {
          return this.$route.path
        }
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
