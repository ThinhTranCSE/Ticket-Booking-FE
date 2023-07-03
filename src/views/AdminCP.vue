<template>
    <b-container>
            <b-tabs content-class="mt-3" class="mt-5">
                <b-tab title="Phim" active @click="() => this.state = 'movie'">
                    <MovieAdminCP v-if="state == 'movie'"></MovieAdminCP>
                </b-tab>
                <b-tab title="Rạp" @click="() => this.state = 'theater'">
                    <TheaterAdminCP v-if="state == 'theater'"></TheaterAdminCP>
                </b-tab>
                <b-tab title="Suất chiếu" @click="() => this.state = 'show'">
                    <ShowAdminCP v-if="state == 'show'"></ShowAdminCP>
                </b-tab>
            </b-tabs>
    </b-container>
</template>

<script>
import MovieAdminCP from '../components/AdminCP/MovieAdminCP.vue'
import TheaterAdminCP from '../components/AdminCP/TheaterAdminCP.vue'
import ShowAdminCP from '../components/AdminCP/ShowAdminCP.vue';

export default {
    name: 'AdminCP',
    components: {
        MovieAdminCP,
        TheaterAdminCP,
        ShowAdminCP
    },
    data(){
        return {
            state: 'movie',
        }
    }
}
</script>

<style scoped>

</style>