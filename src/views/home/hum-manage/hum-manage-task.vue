<template>
  <div id="dep-manage-task">
    <bottom :user="1" text="签到">
      <div slot="title">招聘信息</div>
      <el-collapse v-model="activeNames" @change="handleChange" accordion slot="content">
        <el-collapse-item title="Boss直聘" name="1">
          <div>BOSS直聘是在全球范围内首创互联网直聘模式的在线招聘产品，致力于为招聘者和求职者搭建高效沟通、信息对等的平台。</div>
          <a href="https://www.zhipin.com/" target="_blank">点击进入</a>
        </el-collapse-item>
        <el-collapse-item title="拉勾网" name="2">
          <div>拉勾网，是一家专为拥有3至10年工作经验的资深互联网从业者，提供工作机会的招聘网站。</div>
          <a href="https://www.lagou.com/" target="_blank">点击进入</a>
        </el-collapse-item>
        <el-collapse-item title="前程无忧" name="3">
          <div>“前程无忧”(Nasdaq: JOBS)是国内一个集多种媒介资源优势的专业人力资源服务机构，创始人为甄荣辉。</div>
          <a href="https://www.51job.com/" target="_blank">点击进入</a>
        </el-collapse-item>
        <el-collapse-item title="海投网" name="4">
          <div>海投网定位于高校毕业生，为高校毕业生与知名企业搭建了一座有效的桥梁，使全国各大高校的校园招聘会、宣讲会信息能够第一时间被网站用户看到</div>
          <a href="https://www.haitou.cc/" target="_blank">点击进入</a>
        </el-collapse-item>
      </el-collapse>
    </bottom>
  </div>
</template>

<script>

  export default {
    name: "human-manage-task",
    components: {
      bottom: () => import('@/components/content/homeCard/sign-card')
    },
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #333;
    color: red;
  }
</style>