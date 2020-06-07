<template>
  <div id="bottom">
    <div class="message">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div style="padding: 0 20px">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="sign">
      <el-button type="primary" icon="el-icon-edit" @click="sign()">{{text}}</el-button>
    </div>
  </div>
</template>

<script>
  import { sign } from "../../../service/sign";

  export default {
    name: "left-bottom",
    props: {
      text: {
        type: String,
        default: '签到'
      },
      user: {
        type: Number,
        default: 0
      }
    },
    methods: {
      sign() {
        sign().then(res => {
          if (res.data.state == 200 && this.user == 0) {
            this.$alert('签到成功,等待审核', {
              confirmButtonText: '确定'
            })
          } else if (res.data.state == 200) {
            this.$alert('签到成功', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert('你今天已经签过到了', {
              confirmButtonText: '确定'
            });
          }
        })
      },
    }
  }
</script>

<style scoped>
  #bottom {
    height: 460px;
    width: 800px;
    background: white;
    border-radius: 15px;
  }

  .title {
    width: 100%;
    height: 75px;
    padding: 20px 0 0 20px;
    font-size: 20px;
    font-weight: bold;
    color: #7C9AAD;
  }

  .message {
    display: flex;
    flex-direction: column;
  }

  .sign {
    height: 85px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>