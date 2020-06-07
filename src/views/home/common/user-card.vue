<template>
  <div id="user-card">
    <div class="top">
      <div class="head">
        <div class="block">
          <el-avatar class="img" :size="170" :src="userImg"></el-avatar>
        </div>
        <div class="work">{{this.$store.state.user.authorityZh}}</div>
      </div>
      <div class="userInfo">
        <div class="userItem">
          <i class="el-icon-user"></i>
          <span style="margin:-3px 0 0 5px; font-size: 18px">{{this.$store.state.user.t_name}}</span>
        </div>
        <div class="userItem">
          <i class="el-icon-lock"></i>
          <span style="margin:-3px 0 0 5px; font-size: 18px" v-show="ifShow" @click="change()">{{this.$store.state.user.password}}</span>
          <span style="margin:-3px 0 0 5px; font-size: 18px" v-show="!ifShow" @click="change()">******</span>
        </div>
      </div>
      <div class="describe">
        <div class="company">
          <p class="describeTitle">所属组织</p>
          <p>小明公司</p>
        </div>
        <div class="department">
          <p class="describeTitle">所属部门</p>
          <p>{{this.$store.state.user.department}}</p>
        </div>
        <div class="tel">
          <p class="describeTitle">联系电话</p>
          <p>{{this.$store.state.user.tel}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user-card",
    data() {
      return {
        //头像地址
        userImg: this.$store.state.user.imgUrl,
        //密码是否显示
        ifShow: false
      }
    },
    methods: {
      change() {
        this.ifShow = !this.ifShow
      }
    }
  }
</script>

<style scoped>
  .top {
    border-radius: 15px;
    height: 520px;
    width: 800px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .head {
    width: 170px;
    height: 220px;
  }

  .work {
    width: 100%;
    text-align: center;
    font-size: 23px;
    line-height: 70px;
  }

  .userInfo {
    width: 360px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .userItem {
    display: flex;
    font-size: 20px;
    width: 50%;
    justify-content: center;
    text-align: center;
  }

  .describe {
    width: 550px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .company, .tel, .department {
    width: 100px;
    height: 100%;
    text-align: center;
  }

  .describeTitle {
    color: #7C9AAD;
    font-size: 14px;
  }

  .img >>> img {
    width: 100%;
    height: 100%;
  }
</style>