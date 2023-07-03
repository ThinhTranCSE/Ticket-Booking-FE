<template>
  <b-overlay :show="is_busy">
    <b-container class="mt-4">
        <PosterCardList :movies-data="movies_data"></PosterCardList>
    </b-container>
  </b-overlay>
</template>


<script>
import PosterCardList from '../components/PosterCardList.vue'
import httpCommon from '../http-common';

export default {
  name: 'HomeView',
  data(){
    return {
      movies_data: [],
      is_busy: false,
    }
  },
  components: {
    PosterCardList,
},
  async created(){
    try{
        this.is_busy = true;
        setTimeout(() => this.is_busy = false, 3000);

        const { data } = await httpCommon.get('/movies');
        this.movies_data = data.data;

        this.is_busy = false;
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
