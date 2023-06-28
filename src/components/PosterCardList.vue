<template>
    <b-container>      
      <b-row>
          <template v-for="(item, index) in moviesData">
            <PosterCard :key="index" :movie-data="item"></PosterCard>
            <div v-if="index % 3 == 2" class="w-100" :key="index"></div>
          </template>
          <b-col v-if="moviesData.length % 3 == 2" cols="4"></b-col>
      </b-row>
    </b-container>

</template>

<script>
import PosterCard from '../components/PosterCard.vue'
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
    PosterCard
  }
}
</script>

<style>

</style>