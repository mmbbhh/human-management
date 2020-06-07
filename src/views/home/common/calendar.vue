<template>
  <div id="calendar">
    <div class="top">
      <el-calendar v-model="value" class="cal">
        <template
            slot="dateCell"
            slot-scope="{date, data}">
          <div>{{ data.day.split('-').slice(2).join('-') }}</div>
          <div v-if="data.day.split('-').slice(1)[0] == nowMonth">
           <p v-if="ifSign(data.day) == 1" style="text-align: right;transform: translateY(-35px)">✔</p>
           <p v-if="ifSign(data.day) == -1" style="text-align: right;transform: translateY(-35px)">✘</p>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
  import { allSign } from "../../../service/sign";

  export default {
    name: "calendar",
    mounted() {
      allSign().then(res => {
        console.log(res.data)
        this.calendar = res.data
      })
    },
    data() {
      return {
        //日历内容
        value: new Date(),
        reverse: true,
        calendar: [[],[]]
      }
    },
    methods: {
      ifSign(day) {
        for (let item of this.calendar[0]) {
          if (item == day) {
            return 1
          }
        }
        for (let item of this.calendar[1]) {
          if (item == day) {
            return -1
          }
        }
        return 2
      }
    },
    computed: {
      nowMonth() {
        let date = new Date();
        return date.getMonth() + 1
      }
    }
  }
</script>

<style scoped>
  .top {
    height: 380px;
    width: 450px;
    background: white;
    border-radius: 15px;
  }

  .cal {
    border-radius: 15px;
  }

  .cal >>> .el-button {
    position: unset;
  }
</style>