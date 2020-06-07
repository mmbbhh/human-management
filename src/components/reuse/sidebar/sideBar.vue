<template>
  <div class="side">
    <div v-for="(item,index) in items" class="select"
         :class="{'selected': index == now}"
         @click="chose(index, item.path)">
      <div :class="{'point': index == now}"></div>
      <div class="items">
        <i :class="item.iconName" style="color: white"></i>
        <span class="title">{{item.name}}</span>
      </div>
      <div :class="{'point': index == now}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sideBar",
    props: {
      items: {
        type: Array
      }
    },
    data: () => {
      return {
        now: 0
      }
    },
    methods: {
      chose(index, path) {
        this.now = index;
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped>
  .select {
    height: 65px;
    text-align: center;
    line-height: 75px;
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;
  }

  .selected {
    background: #6F99B1;
  }

  .side {
    background: linear-gradient(to bottom,#325C73,#3D779C);
    height: 100%;
  }

  .items {
    width: 75px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    color: white;
    font-size: 16px;
    line-height: 55px;
  }

  .point:first-child {
    width: 20px;
  }

  .point:last-child {
    border-width: 10px;
    border-style: solid;
    border-color: transparent #DDEEF8 transparent transparent;
  }
</style>