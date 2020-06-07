<template>
  <div id="homeBox">
    <el-container style="height: 100%" direction="vertical">
      <el-header style="height: 70px; padding: 0; position:fixed; z-index: 999; width: 100%">
        <headBar>
          <img :src="logo" slot="logo" alt="" height="70px" width="163px">
          <span style="overflow: hidden" slot="describe">| 企业人事管理系统</span>
          <el-avatar class="img" :src="url" shape="circle" slot="head" :size="35" fit="fill" style="margin-right: 15px"></el-avatar>
          <span slot="name"
                style="margin-right: 5px;
                margin-left: 15px;
                margin-top: -2px;
                font-size: 20px;
                color: white;">{{$store.state.user.name}}</span>
          <div slot="out" class="loginOut" @click="loginOut()">
            <i class="el-icon-switch-button"></i>
          </div>
        </headBar>
      </el-header>
      <el-container style="margin-top: 70px;">
        <el-aside style="width: 100px; height: 100%; position: fixed">
          <sideBar :items="items"></sideBar>
        </el-aside>
        <el-main style="margin-top: 0; padding-top: 0; margin-left: 100px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import headBar from "components/reuse/headbar/headBar";
  import sideBar from "components/reuse/sidebar/sideBar";

  export default {
    name: "homeBox",
    data:() => {
      return {
        logo: require('assets/left.png'),
        items: []
      }
    },
    mounted() {
      if (this.$store.state.user.authority == 'ROLE_user') {
        this.items = [
          {name:"首页", path:"/home", iconName: "el-icon-s-home"},
          {name:"申请", path:"/apply", iconName: "el-icon-notebook-2"},
          {name:"设置", path:"/setting", iconName: "el-icon-setting"}
        ]
      } else if (this.$store.state.user.authority == 'ROLE_department_manage') {
        this.items = [
          {name:"首页", path:"/home", iconName: "el-icon-s-home"},
          {name:"申请", path:"/apply", iconName: "el-icon-notebook-2"},
          {name:"通知", path:"/notice", iconName: "el-icon-message-solid"},
          {name:"设置", path:"/setting", iconName: "el-icon-setting"}
        ]
      } else if (this.$store.state.user.authority == 'ROLE_human_manage') {
        this.items = [
          {name:"首页", path:"/home", iconName: "el-icon-s-home"},
          {name:"人员", path:"/human", iconName: "el-icon-user"},
          {name:"设置", path:"/setting", iconName: "el-icon-setting"}
        ]
      } else if (this.$store.state.user.authority == 'ROLE_financial') {
        this.items = [
          {name:"首页", path:"/home", iconName: "el-icon-s-home"},
          {name:"设置", path:"/setting", iconName: "el-icon-setting"}
        ]
      }
    },
    components: {
      headBar: headBar,
      sideBar: sideBar
    },
    methods: {
      loginOut() {
        this.$store.commit('loginOut')
        this.$router.push('/login')
      }
    },
    computed: {
      url() {
        return this.$store.state.user.imgUrl
      }
    }
  }
</script>

<style scoped>
  .el-header {
    line-height: 65px;
    font-size: 25px;
  }

  .loginOut {
    height: 60%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid white;
    color: white;
  }

  .img >>> img {
    width: 100%;
    height: 100%;
  }
</style>
