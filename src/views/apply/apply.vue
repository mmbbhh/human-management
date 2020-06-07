<template>
  <div id="apply">
    <div class="title" v-if="role">
      审核申请
    </div>
    <addApply @finish="getAll()" v-if="!role"></addApply>
    <el-divider></el-divider>
    <card :role="role" ref="card" @select="select"></card>
    <el-dialog
        title="查看申请"
        :visible.sync="dialogWatch"
        width="80%">
      <div class="showApply">
        <h2>{{nowItem.title}}</h2>
        <div style="padding:0 30px 20px 30px" v-html="nowItem.message"></div>
        <p v-if="!role">回复：{{nowItem.reason}}</p>
        <div v-if="role && nowItem.state === '未审核'" class="response">
          <el-input style="width: 300px" v-model="response" placeholder="请输入理由"></el-input>
          <div style="flex:1"></div>
          <el-button @click="submit(true)" type="primary">同意</el-button>
          <el-button @click="submit(false)" type="danger">拒绝</el-button>
        </div>
        <br/>
        <span>{{nowItem.date}}</span>
        <span style="float: right">{{nowItem.state}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { check } from "../../service/apply";

  export default {
    name: 'apply',
    mounted() {
      this.role = this.$store.state.user.authority=='ROLE_department_manage'
    },
    components: {
      addApply: () => import('./user/addApply'),
      card: () => import('./common/ApplyCard')
    },
    data() {
      return {
        dialogWatch: false,
        nowItem: {},
        role: false,
        response: ''
      }
    },
    methods: {
      getAll() {
        this.$refs.card.getAll()
      },
      select(item) {
        this.nowItem = item
        this.dialogWatch = true
      },
      submit(bol) {
        check(this.nowItem.id, bol, this.response).then(res => {
          this.$message.success(res.data.message)
          this.dialogWatch = false
          this.getAll()
        })
      }
    }
  }

</script>

<style scoped>
  #apply {
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

  .showApply {
    width: 100%;
  }

  h2 {
    font-size: 35px;
    text-align: center;
  }

  .response {
    width: 100%;
    height: 40px;
    display: flex;
  }
</style>