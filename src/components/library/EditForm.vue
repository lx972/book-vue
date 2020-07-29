<template>
  <div>
    <i class="el-icon-circle-plus-outline" @click="dialogFormVisible = true"></i>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
          <el-image
            style="width: 100px; height: 100px"
            :src="form.cover"
            fit="fill"></el-image>
          <upload-img @uploadSuccess="uploadSuccess"></upload-img>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">
          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.category.id" placeholder="请选择分类">
            <el-option label="文学" value="1"></el-option>
            <el-option label="流行" value="2"></el-option>
            <el-option label="文化" value="3"></el-option>
            <el-option label="生活" value="4"></el-option>
            <el-option label="经管" value="5"></el-option>
            <el-option label="科技" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" :style="addstyle">添加</el-button>
        <el-button type="primary" @click="upd" :style="updstyle">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import UploadImg from "@/components/library/UploadImg";
  export default {
    name: "EditForm",
    components: {UploadImg},
    data() {
      return {
        dialogFormVisible: false,
        title: '添加书籍',
        addstyle: 'display:block',
        updstyle: 'display:none',
        form: {
          id: '',
          title: '',
          author: '',
          date: '',
          press: '',
          cover: '',
          abs: '',
          category: {
            id: '',
            name: ''
          }
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear() {
        this.form = {
          id: '',
          title: '',
          author: '',
          date: '',
          press: '',
          cover: '',
          abs: '',
          category: {
            id: '',
            name: ''
          }
        }
        this.title = '添加书籍'
        this.updstyle = 'display:none'
        this.addstyle = 'display:block'
      },
      add() {
        this.$axios
          .post('/books', {
            cover: this.form.cover,
            title: this.form.title,
            author: this.form.author,
            date: this.form.date,
            press: this.form.press,
            abs: this.form.abs,
            cid: this.form.category.id
          }).then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message.success(successResponse.data.msg)
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
      },
      upd() {
        this.$axios
          .patch('/books', {
            id: this.form.id,
            cover: this.form.cover,
            title: this.form.title,
            author: this.form.author,
            date: this.form.date,
            press: this.form.press,
            abs: this.form.abs,
            cid: this.form.category.id
          }).then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message.success(successResponse.data.msg)
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
      },
      uploadSuccess(pathFile){
        this.form.cover=pathFile
      }
    }
  }
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>
