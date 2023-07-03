<template>
    <b-col style="margin-top: 5rem;" cols="4">            
        <b-card
           
            :img-src="movieData.poster"
            img-alt="Image"
            img-top
            style="max-width: 15rem;"
            class="mb-2"
        >
            <p class="mb-3 card-title">{{ movieData.name }}</p>
            <b-button :to="{ name: 'movie', params: { id: movieData.id }}" variant="dark" type="dark">Xem chi tiết</b-button>
        </b-card>
    </b-col>
   
</template>

<script>
export default {
    name: 'PosterCard',
    props: {
        movieData: Object,
    },
    data(){
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .card-title {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
        white-space: nowrap;
    }
</style>