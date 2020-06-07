<template>
  <div id="setting">
    <div class="title">
      个人设置
    </div>
    <el-form class="setForm" ref="form" :model="form" label-width="80px" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-form-item style="align-self: center" label-width="0">
        <div class="head">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align: center">点击上传新头像</p>
        </div>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.user" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="*旧密码">
        <el-input v-model="form.oldPwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="*新密码">
        <el-input v-model="form.Pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="*确认密码">
        <el-input v-model="form.CPwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.tel"
                  onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                  maxlength="11"></el-input>
      </el-form-item>
      <el-form-item style="align-self: center" label-width="0">
        <el-button type="primary" @click="uploadEdit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  import { uploadImg } from "../../service/headImg";
  import { editInfo, token, login } from "../../service/userService";
  import { User } from "../../store/state"

  export default {
    name: "setting",
    mounted() {
      this.form.user = this.$store.state.user.name
      this.imageUrl = this.$store.state.user.imgUrl
    },
    data() {
      return {
        form: {
          user: '',
          oldPwd: '',
          Pwd: '',
          CPwd: '',
          tel: '',
        },
        imageUrl: ''
      }
    },
    methods: {
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error({
            message: '上传头像图片只能是 JPG 格式!',
            offset: 110
          });
        }
        if (!isLt2M) {
          this.$message.error({
            message: '上传头像图片大小不能超过 2MB!',
            offset: 110
          });
        }
        let newName = this.$md5(this.$store.state.user.name + moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss'))
        const copyFile = new File([file], newName + '.jpg')
        this.uploadFile(copyFile)
        console.log(newName)
        return false
      },
      uploadFile(file) {
        let formData = new FormData()
        formData.append('source', file)
        formData.append('key', '53942cc0d280835bae497e559a35aa10')
        uploadImg(formData).then(res => {
          console.log(res.data)
          if (res.data.status_code == 200) {
            this.imageUrl = res.data.image.display_url
          }
        }, err => {
          console.log(err.response)
        })
      },
      uploadEdit() {
        if (this.form.oldPwd == '' || this.form.Pwd == '' || this.form.CPwd == '') {
          this.$message.error({
            message: '请输入完整信息',
            offset: 110
          })
        } else if (this.form.CPwd !== this.form.Pwd) {
          this.$message.error({
            message: '两次密码输入不一致',
            offset: 110
          })
        } else if (this.form.oldPwd === this.form.CPwd) {
          this.$message.error({
            message: "新旧密码一致",
            offset: 110
          })
        } else if (this.form.tel !== '' && this.form.tel.length !== 11) {
          this.$message.error({
            message: "请输入正确的手机号",
            offset: 110
          })
        } else {
          editInfo(this.form.oldPwd, this.form.CPwd, this.form.tel, this.imageUrl).then(res => {
            if (res.data.state == 200) {
              login().then(res => {
                console.log(res.data)
                const user = new User({
                  name: this.form.user,
                  authority: res.data.name,
                  department: res.data.nameD,
                  authorityZh: res.data.nameR,
                  password: this.form.CPwd,
                  tel: res.data.user_phone
                })
                this.$store.commit('updateUser', user)
                if (res.data.img_url) {
                  this.$store.commit("changeImg", res.data.img_url)
                }
              })
              this.$message.success({
                message: res.data.message,
                offset: 110
              })
              this.$message.success({
                message: res.data.message,
                offset: 110
              })
              token({
                username: this.$store.state.user.name,
                password: this.form.CPwd
              })
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
  #setting {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .setForm {
    width: 400px;
    height: 550px;
    padding: 30px;
    background: white;
    display: flex;
    flex-direction: column;
  }

  .title {
    padding: 0 0 0 30px;
    font-size: 25px;
    font-weight: bold;
    color: #7C9AAD;
    align-self: flex-start;
  }

  .head {
    width: 100px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px solid #7C9AAD;
    border-radius: 45px;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
    border-radius: 45px;
  }
</style>