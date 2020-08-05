<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard'}">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/content/book'}">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/content/article'}">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-input
        v-model="article.title"
        style="margin: 10px 0px;font-size: 18px;"
        placeholder="请输入标题"></el-input>
    </el-row>
    <el-row>
      <mavon-editor
        :toolbars="markdownOption"
        v-model="article.content"
        @save="saveArticles">
        <button type="button" class="op-icon el-icon-document" :title="'摘要/封面'" slot="left-toolbar-after"
                @click="dialogVisible = true"></button>
      </mavon-editor>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <el-divider content-position="left">摘要</el-divider>
      <el-input
        type="textarea"
        v-model="article.article_abstract"
        rows="6"
        maxlength="255"
        show-word-limit></el-input>
      <el-divider content-position="left">封面</el-divider>
      <div style="margin-top: 20px">
        <el-input v-model="article.cover" autocomplete="off" placeholder="图片 URL"></el-input>
        <UploadImg @uploadSuccess="uploadSuccess" ref="imgUpload" style="margin-top: 5px"></UploadImg>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import UploadImg from '../common/UploadImg'
  export default {
    name: 'TextEdit',
    components: {UploadImg},
    data () {
      return {
        markdownOption: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        article: {
          title: '',
          content: '',
          article_abstract: '',
          cover: '',
        },
        dialogVisible: false
      }
    },
    methods: {
      saveArticles () {
        this.$confirm('检测到未保存的内容，是否保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        }).then(() => {
          this.$axios.post('/jotter/article', {
            title: this.article.title,
            content: this.article.content,
            article_abstract: this.article.article_abstract,
            cover: this.article.cover,
          }).then(resp => {
            if (resp.data.code === 200) {
              this.$message.success(resp.data.msg)
            } else {
              this.$message.error(resp.data.msg)
            }
          })
        })
      },
      uploadSuccess (pathFile) {
        this.article.cover=pathFile
      },
    }
  }
</script>

<style scoped>

</style>
