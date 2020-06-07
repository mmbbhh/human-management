<template>
  <div id="home">
    <div class="title">
      <p class="wel" style="color: black;">{{this.$store.state.user.t_name}}，</p>
      <p class="wel">欢迎使用<span style="color: cornflowerblue;">小马</span>人事管理系统</p>
    </div>
    <div class="body">
      <div class="left">
        <l-top/>
        <l-bottom-user v-if="this.$store.state.user.authority=='ROLE_user'"/>
        <l-bottom-dep-manage v-if="this.$store.state.user.authority=='ROLE_department_manage'"/>
        <l-bottom-hum-manage v-if="this.$store.state.user.authority=='ROLE_human_manage'"/>
        <l-bottom-fin-manage v-if="this.$store.state.user.authority=='ROLE_financial'"/>
      </div>
      <div class="right">
        <r-top/>
        <r-bottom/>
      </div>
    </div>
  </div>
</template>

<script>
  import { refresh } from "../../service/userService";

  export default {
    name: "hello",
    mounted() {
      //定时更新token
      setInterval(refresh, 1200000);
    },
    components: {
      lTop: () => import('./common/user-card'),
      lBottomUser: () => import('./user/user-task'),
      lBottomDepManage: () => import('./dep-manage/dep-manage-task'),
      rTop: () => import('./common/calendar'),
      rBottom: () => import('./common/timeline'),
      lBottomHumManage: () => import('./hum-manage/hum-manage-task'),
      lBottomFinManage: () => import('./financial-manage/financial-manage-task')
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    height: 100%;
  }

  .wel {
    margin: 0;
    padding: 0;
  }

  .wel:first-child {
    font-weight: bold;
    padding: 18px 0 0 18px;
    font-size: 20px;
  }

  .wel:last-child {
    padding: 3px 0 0 18px;
    font-size: 16px;
  }

  .title {
    width: 100%;
    height: 75px;
    padding: 20px 0 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: #7C9AAD;
  }

  .img >>> img {
    height: 100%;
    width: 100%;
  }

  .body {
    width: 100%;
    min-width: 1290px;
    height: 1100px;
    display: flex;
    justify-content: space-around;
  }

  .left {
    height: 100%;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .right {
    height: 100%;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-width: 330px;
    align-items: center;
  }

</style>

<style>
  .el-calendar-table .el-calendar-day {
    height: 40px;
  }

  .is-selected {
    color: #1989FA;
  }
</style>