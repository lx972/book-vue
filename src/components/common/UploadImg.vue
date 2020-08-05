<template>
  <el-upload
    class="upload-demo"
    action="http://localhost:8082/api/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    with-credentials
    show-file-lis="true"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
  export default {
    name: "UploadImg",
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        console.log(response)
        if (response.code === 200) {
          this.$message.success(response.msg)
          this.$emit("uploadSuccess",response.pathFile)
        }else {
          this.$message.error(response.msg)
        }
      }
    }
  }
</script>

<style scoped>

</style>
