<template>
  <div class="headBar">
    <div class="left">
      <slot name="logo"></slot>
      <slot name="describe"></slot>
    </div>
    <div class="right">
      <slot name="out"></slot>
      <slot name="head"></slot>
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "headBar",
    data:() => {
      return {
        logo: require('assets/left.png')
      }
    },
  }
</script>

<style scoped>
  .headBar {
    height: 100%;
    display: flex;
    background: linear-gradient(to right,#1A5775,#3E90C2,#1A5775);
  }

  .left {
    flex: 4;
    text-align: left;
    display: flex;
    color: white;
  }

  .right {
    flex: 6;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
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
</style>