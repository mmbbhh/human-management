<template>
  <div id="timeline">
    <div class="bottom">
      <div class="title">
        日程安排
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item v-for="(item,index) in activities"
                            :key="index"
                            :timestamp="item.timestamp"
                            placement="top">
            <el-card>
              <h4>{{item.content}}</h4>
              <p @click="edit(index)" v-show="index !== now">{{toDo[index]}}</p>
              <el-input v-model="toDo[index]" v-show="index === now" @blur="editDown(index)"></el-input>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "timeline",
    data() {
      return {
        //时间线
        activities: [{
          content: '活动策划',
          timestamp: '2020-4-1'
        }, {
          content: '进行审核',
          timestamp: '2020-4-2'
        }, {
          content: '活动安排',
          timestamp: '2020-4-3'
        }],
        toDo: [
          "你要干什么1",
          "你要干什么2",
          "你要干什么3"
        ],
        now: '',
      }
    },
    methods: {
      edit(index) {
        this.now = index
      },
      editDown(index) {
        this.now = ''
      }
    }
  }
</script>

<style scoped>
  .title {
    width: 100%;
    height: 75px;
    padding: 20px 0 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: #7C9AAD;
  }

  .bottom {
    border-radius: 15px;
    height: 600px;
    width: 450px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .block {
    width: 400px;
  }
</style>