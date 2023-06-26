<template>
    <b-container>      
      <b-row>
          <template v-for="(item, index) in moviesData">
            <poster-card-vue :key="index" :movie-data="item"></poster-card-vue>
            <div v-if="index % 3 == 2" class="w-100" :key="index"></div>
          </template>
          <b-col v-if="moviesData.length % 3 == 2" cols="4"></b-col>
      </b-row>
    </b-container>

</template>

<script>
import PosterCardVue from '../components/PosterCard.vue'
export default {
  name: 'PosterCardList',
  props: {
    moviesData: Array,
  },
  data(){
    return{

    }
  },
  components: {
    PosterCardVue
  }
}
</script>

<style>

</style>