<template>
  <b-containter id="app" fluid>
    <header-vue/>
      <!-- <nav-bar-vue/> -->
      <router-view class="view"/>
    <footer-vue/>
  </b-containter>
  
</template>

<script>
import HeaderVue from './components/Header.vue';
import NavBarVue from './components/NavBar.vue';
import FooterVue from './components/Footer.vue';


export default {
  name: 'app',
  components: {
    HeaderVue,
    NavBarVue,
    FooterVue,
  },
}
</script>

<style>
  .view{
    min-height: 800px;
  }
</style>
