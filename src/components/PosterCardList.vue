<template>
    <b-container>
      <b-row>
          <template v-for="(item, index) in items">
            <poster-card-vue :key="index"></poster-card-vue>
            <div v-if="index % 3 == 2" class="w-100" :key="index"></div>
          </template>
          <b-col v-if="index % 3 == 2" cols="4"></b-col>
      </b-row>
    </b-container>

</template>

<script>
import PosterCardVue from '../components/PosterCard.vue'
export default {
  name: 'PosterCardList',
  props: {

  },
  data(){
    return{
      items: [
        1,1,1,1,1,1,1,1
      ],
    }
  },
  components: {
    PosterCardVue
  }
}
</script>

<style>

</style>