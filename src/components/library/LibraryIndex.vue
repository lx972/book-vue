<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <side-menu @indexSelect="indexSelect"></side-menu>
    </el-aside>
    <el-main>
      <books class="books-area" ref="booksArea" @currentChange="currentChange"></books>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from "@/components/library/SideMenu";
  import Books from "@/components/library/Books";

  export default {
    name: "LibraryIndex",
    components: {Books, SideMenu},
    data() {
      return {
        cid: '0',
        currentPage: '',
        pageSize: '',
      }
    },
    methods: {
      indexSelect(cid) {
        this.cid = cid
        //分类首页
        this.currentPage = 1
        this.pageSize = 10
        //清空搜索的关键词
        this.$refs.booksArea.keywords = ''
        this.findAllByCategoryId();
      },
      currentChange() {
        this.currentPage = this.$refs.booksArea.currentPage
        this.pageSize = this.$refs.booksArea.pageSize
        this.findAllByCategoryId();
      },
      findAllByCategoryId() {
        this.$axios.get('/category/book/' + this.cid, {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            keywords: this.$refs.booksArea.keywords,
          }
        })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              this.$message.success(successResponse.data.msg)
              this.$refs.booksArea.books = successResponse.data.data
              this.$refs.booksArea.total = successResponse.data.total
            }
          })

      },

    }
  }
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
