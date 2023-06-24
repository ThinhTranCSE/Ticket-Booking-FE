<template>
    <b-container class="mt-4">
      <poster-card-list></poster-card-list>
    </b-container>
</template>


<script>
import PosterCardList from '../components/PosterCardList.vue'

export default {
  name: 'HomeView',
  props: {
    msg: String
  },
  components: {
    PosterCardList,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
