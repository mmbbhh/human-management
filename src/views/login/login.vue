<template>
  <div id="login">
    <div class="page">
      <el-form ref="form" :model="form" label-width="0px " v-loading.fullscreen.lock="loading">
        <div class="title">小马人事管理系统</div>
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" show-password placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" style="width: 200px; text-align: center" @click="toLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login,token } from "../../service/userService";
  import { User } from "../../store/state"

  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      toLogin() {
        if (this.user === "") {
          this.$message.error({
            message: '用户名为空',
            offset: 110
          });
          return;
        }
        if (this.password === "") {
          this.$message.error({
            message: '密码为空',
            offset: 110
          });
        } else {
          this.change()
          token(this.form).then(res => {
            if (res.status != 400) {
              this.$store.commit('addToken', res.data.access_token)
              this.$store.commit('addRefresh', res.data.refresh_token)
              login().then(res => {
                const user = new User({
                  name: this.form.username,
                  t_name: res.data.Tname,
                  authority: res.data.name,
                  department: res.data.nameD,
                  authorityZh: res.data.nameR,
                  password: this.form.password,
                  tel: res.data.user_phone
                })
                this.$store.commit('updateUser', user)
                if (res.data.img_url) {
                  this.$store.commit("changeImg", res.data.img_url)
                } else {
                  this.$store.commit("changeImg", "http://123.57.217.239:8889/images/2020/04/09/timgimagequality80sizeb9999_10000sec1586426123629di8c9947d78022a9c3f53150682af5fd97imgtype0srchttp3A2F2Fhbimg.huabanimg.com2F9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658.jpg"
                )
                }
                this.$message.success({
                  message: "登陆成功",
                  offset: 110
                })
                this.change()
                this.$router.push('/home')
              })
            } else {
              this.$message.error({
                message: "用户名或密码错误",
                offset: 110
              })
              this.change()
            }
          }, rej => {
            this.$message.error({
              message: "用户名或密码错误",
              offset: 110
            })
            this.change()
          })
        }
      },
      //改变加载状态
      change() {
        this.loading = !this.loading
      }
    }
  }
</script>

<style scoped>
  #login {
    background: url('http://123.57.217.239:8889/images/2020/04/01/5a4dea4b8ee92.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page {
    width: 300px;
    height: 250px;
    overflow: hidden;
    z-index: 1;
    box-shadow: -2px 2px 10px rgba(100,100,100,1);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 20px;
  }

  .page:before {
    width: 300px;
    height: 220px;
    content: '';
    position: absolute;
    background-image: url('http://123.57.217.239:8889/images/2020/04/01/5a4dea4b8ee92.jpg');
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(9px);
    z-index: -1;
  }

  .title {
    padding-top: 5px;
    height: 50px;
    width: 100%;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
  }

  .input {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .content {
    width: 250px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 20px;
    display: flex;
    align-items: center;
  }

  .button {
    height: 30px;
    margin-top: 15px;
    width: 90px;
    background: #F86244;
    color: #FFFFFF;
    text-align: center;
    line-height: 25px;
  }


  input{
    background:none;
    outline:none;
    border:none;
  }
</style>