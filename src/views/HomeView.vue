<template>
    <b-container class="mt-4">
      <poster-card-list :movies-data="movies_data"></poster-card-list>
    </b-container>
</template>


<script>
import PosterCardList from '../components/PosterCardList.vue'
import httpCommon from '../http-common';

export default {
  name: 'HomeView',
  data(){
    return {
      movies_data: [],
    }
  },
  props: {

  },
  methods: {

  },
  components: {
    PosterCardList,
  },
  async created(){
    try{
        const { data } = await httpCommon.get('/movies');
        this.movies_data = data.data;
    }
    catch(err){
        console.log(err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
