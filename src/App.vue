<template>
  <!-- <div id="app" class="container-fluid">
    <header-vue></header-vue>
    <nav-bar-vue></nav-bar-vue>
    <HomeView></HomeView>
  </div> -->

  <b-containter id="app" fluid>
    <header-vue/>
    <nav-bar-vue/>
    <router-view class="view"/>
    <footer-vue/>
  </b-containter>
  
</template>

<script>
import HeaderVue from './components/Header.vue';
import NavBarVue from './components/NavBar.vue';
import HomeView from './views/HomeView.vue'
import FooterVue from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    HomeView,
    HeaderVue,
    NavBarVue,
    FooterVue
  }
}
</script>

<style scoped>
/* *{ 
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
 } */
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
  
  .view{
    min-height: 500px;
  }
</style>
