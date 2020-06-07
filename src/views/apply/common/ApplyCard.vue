<template>
  <div id="Card">
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <div
        style="display: flex; width: 90%; justify-content: space-around; align-self: center; flex-wrap: wrap; padding: 0 50px">
      <el-card :body-style="{ padding: '0px' }" v-for="(item,index) in listShow.slice((nowPage-1)*10,nowPage*12)"
               class="card">
        <div slot="header">
          {{item.title}}
          <el-button style="float: right; padding: 3px 0" type="text" @click="tip(item)">查看</el-button>
        </div>
        <div style="height: 150px">
          <div class="card-body" v-html="item.message"></div>
          <div class="result">
            <span>{{item.date}}</span>
            <span style="color: red" v-if="!role">{{item.state}}</span>
            <span v-if="role">{{item.username}}</span>
          </div>
        </div>
      </el-card>
    </div>

    <el-pagination
        :background=true
        layout="prev, pager, next"
        :total="(list.length/10)*12"
        :current-page="nowPage"
        @current-change="toPage"
        style="align-self: center">
    </el-pagination>
  </div>
</template>

<script>
  import {staffApply, getApply, Apply} from "@/service/apply";

  export default {
    name: "ApplyCard",
    created() {
      this.getAll()
    },
    data() {
      return {
        //所有申请
        list: [],
        //被拒绝的申请
        listC: [],
        //被接受的申请
        listR: [],
        //待处理的申请
        listN: [],
        //显示的申请
        listShow: [],
        nowPage: 1,
        options: [{
          value: 1,
          label: '所有申请'
        }, {
          value: 2,
          label: '拒绝申请'
        }, {
          value: 3,
          label: '同意申请'
        }, {
          value: 4,
          label: '待处理申请'
        }],
        value: 4
      }
    },
    props: {
      role: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getAll() {
        this.list = []
        this.listC = []
        this.listR = []
        this.listN = []
        this.listShow = []
        if (this.$store.state.user.authority == 'ROLE_user') {
          getApply().then(res => {
            this.list = Apply.fromJson(res.data).data;
            for (let item of this.list) {
              switch (item.state) {
                case "未审核":
                  this.listN.push(item)
                  break
                case "已通过":
                  this.listR.push(item)
                  break
                default:
                  this.listC.push(item)
              }
            }
            this.listShow = this.listN
          })
        } else {
          staffApply().then(res => {
            this.list = Apply.fromJson(res.data).data;
            for (let item of this.list) {
              switch (item.state) {
                case "未审核":
                  this.listN.push(item)
                  break
                case "已通过":
                  this.listR.push(item)
                  break
                default:
                  this.listC.push(item)
              }
            }
            this.listShow = this.listN
          })
        }
      },
      tip(item) {
        this.$emit('select', item)
      },
      toPage(page) {
        this.nowPage = page
      }
    },
    watch: {
      value(val) {
        switch (val) {
          case 1:
            this.listShow = this.list
            break
          case 2:
            this.listShow = this.listC
            break
          case 3:
            this.listShow = this.listR
            break
          case 4:
            this.listShow = this.listN
            break
        }
      }
    }
  }
</script>

<style scoped>
  #Card {
    display: flex;
    flex-direction: column;
  }

  .card {
    min-width: 180px;
    max-width: 18vw;
    margin: 10px;
    cursor: default;
    flex-grow: 1;
  }

  .card-body {
    height: 100px;
    padding: 0 10px;
    overflow: hidden;
  }

  .result {
    height: 50px;
    display: flex;
    line-height: 50px;
    justify-content: space-between;
  }

  .result > span {
    padding: 0 10px;
  }
</style>