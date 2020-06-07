<template>
  <div id="app">
    <Home id="homeBox" v-if="isShow"></Home>
    <keep-alive>
      <router-view v-if="!isShow"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Home from "./components/content/homeBox/homeBox";

  export default {
    name: 'app',
    components: {
      Home: Home
    },
    computed: {
      isShow() {
        if (this.$store.state.user.name) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
  html, body, #app, #homeBox {
    padding: 0px;
    margin: 0px;
    height: 100%;
    background: #DDEEF8;
  }
</style>
