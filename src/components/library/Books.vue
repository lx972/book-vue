<template>
  <div>
    <el-row style="height: 840px;">
      <search-bar @onSearch="searchByAuthorOrTitle"></search-bar>
      <view-switch class="switch"></view-switch>
      <edit-form ref="editForm" @onSubmit="getAllBook"></edit-form>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import SearchBar from "@/components/library/SearchBar";
  import ViewSwitch from "@/components/library/ViewSwitch";
  import EditForm from "@/components/library/EditForm";

  export default {
    name: "Books",
    components: { EditForm, ViewSwitch, SearchBar},
    data() {
      return {
        books: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        keywords: '',
      }
    },
    mounted: function () {
      //触发父组件的自定义事件和向父组件传值
      this.$emit("currentChange")
    },
    methods: {
      currentChange(currentPage) {
        this.currentPage = currentPage
        //触发父组件的自定义事件和向父组件传值
        this.$emit("currentChange")
      },
      searchByAuthorOrTitle(keywords) {
        this.keywords = keywords
        this.pageSize = 10
        this.currentPage = 1
        //触发父组件的自定义事件和向父组件传值
        this.$emit("currentChange")
      },
      editBook(item) {
        this.$refs.editForm.dialogFormVisible = true
        this.$refs.editForm.form = {
          id: item.id,
          cover: item.cover,
          title: item.title,
          author: item.author,
          date: item.date,
          press: item.press,
          abs: item.abs,
          category: {
            id: item.category.id.toString(),
            name: item.category.name
          }
        }
        this.$refs.editForm.title = '更新书籍'
        this.$refs.editForm.addstyle = 'display:none'
        this.$refs.editForm.updstyle = 'display:block'
      },
      getAllBook() {
        //去数据库再查一次更新书籍列表
        this.pageSize = 10
        this.currentPage = 1
        //触发父组件的自定义事件和向父组件传值
        this.$emit("currentChange")
      },
      deleteBook(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete("/books/" + id)
            .then(successResponse => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //取数据库查一次
              this.getAllBook();
            }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          });
        })
      }
    },
  }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
