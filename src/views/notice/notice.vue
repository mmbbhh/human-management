<template>
  <div id="notice">
    <div class="title">
      下发通知
    </div>
    <el-divider></el-divider>
    <ueditor @show="edit" ref="ueditor" class="myEditor"></ueditor>
    <div class="bar">
      <el-button @click="open" style="float: right" type="primary">提 交</el-button>
    </div>
  </div>
</template>

<script>
  import { uploadNotice } from "../../service/notice";

  export default {
    name: "notice",
    components: {
      ueditor: () => import('@/components/reuse/ueditor/ueditor')
    },
    data() {
      return {
        content: ''
      }
    },
    methods: {
      edit(content) {
        this.content = content
      },
      upload() {
        this.$refs.ueditor.showContent()
        if (this.content == null) {
          this.$message.error("请输入内容")
        } else {
          uploadNotice(this.content).then(res => {
            if (res.data.state == 200) {
              this.$message.success(res.data.message)
              this.$refs.ueditor.content = ''
            }
          })
        }
      },
      open() {
        this.$confirm('通知将下发给所有本部门的员工，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.upload()
        }, rej => {})
      }
    }
  }
</script>

<style scoped>
  #notice {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .title {
    padding: 20px 0 0 30px;
    font-size: 25px;
    font-weight: bold;
    color: #7C9AAD;
  }

  .myEditor {
    width: 70%;
    min-width: 760px;
    align-self: center;
    margin-top: 20px;
  }

  .bar {
    align-self: center;
    width: 70%;
    min-width: 760px;
    height: 40px;
    padding: 15px;
  }
</style>