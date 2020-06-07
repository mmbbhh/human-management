<template>
  <div id="user-left-bottom">
    <bottom>
      <div slot="title">通知消息</div>
      <div slot="content">
        <el-card class="box-card" style="width: 700px; height: 270px; align-self: center">
          <div style="font-weight: bold; margin-bottom: 20px; font-size: 18px">
            {{this.notice.date}}
          </div>
          <div class="text item" style="margin: 5px" v-html="notice.info">
          </div>
        </el-card>
      </div>
    </bottom>
  </div>
</template>

<script>
  import { info } from "../../../service/userService";
  import moment from 'moment'

  export default {
    name: "user-left-bottom",
    components: {
      bottom: () => import('@/components/content/homeCard/sign-card')
    },
    data() {
      return {
        //消息通知
        notice: {
          date: '',
          info: '暂无消息',
          auth: ''
        }
      }
    },
    mounted() {
      info().then(res => {
        console.log(res.data);
        this.notice.info = res.data.content
        this.notice.auth = res.data.uname
        this.notice.date = moment(res.data.upload_date).utc().format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }
</script>

<style scoped>

</style>