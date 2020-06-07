<template>
  <div id="addApply">
    <div class="title">
      申请提交
    </div>
    <div style="width: 100%; height: 40px; padding: 20px 60px 0 0; align-self: center; display: flex; justify-content: flex-end">
      <el-button type="primary" @click="showInput()">
        添 加<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>

    <el-dialog title="添加申请" :visible.sync="dialogInput" width="80%">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <ueditor @show="upload" ref="ueditor"
               style="height: 500px; margin-top: 20px;">
      </ueditor>
      <el-button style="width: 160px; margin-top: 20px;"
                 type="primary" round @click="dialogConfirm = true">
        提交
      </el-button>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogConfirm"
      width="30%"
      top="30vh">
    <span>确认提交？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
  import { pushApply } from "@/service/apply";

  export default {
    name: "addApply",
    data() {
      return {
        dialogInput: false,
        dialogConfirm: false,
        title: ''
      }
    },
    components: {
      ueditor: () => import('components/reuse/ueditor/ueditor')
    },
    methods: {
      showInput() {
        this.dialogInput = true
      },
      confirm() {
        this.$refs.ueditor.showContent()
        this.dialogConfirm = false
      },
      upload(content) {
        if (!content) {
          this.$message.error({
            message: "内容为空！",
            offset: 110
          })
        } else if(this.title === '') {
          this.$message.error({
            message: "标题为空！",
            offset: 110
          })
        } else {
          pushApply(content, this.title).then(res => {
            console.log(res.data)
            if (res.data.state == 200) {
              this.$message.success({
                message: res.data.message,
                offset: 110,
              })
              this.$emit('finish')
              this.dialogConfirm = false
              this.dialogInput = false
            } else {
              this.$message.error({
                message: res.data.message,
                offset: 110
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    padding: 20px 0 0 30px;
    font-size: 25px;
    font-weight: bold;
    color: #7C9AAD;
  }
</style>