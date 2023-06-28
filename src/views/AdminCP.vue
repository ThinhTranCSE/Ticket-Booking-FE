<template>
    <b-container>
            <!-- <b-form-radio-group
                v-model="state"
                class="mt-3"
            >
                <b-form-radio value="movie">Phim</b-form-radio>
                <b-form-radio value="theater">Rạp</b-form-radio>
                <b-form-radio value="show">Suất chiếu</b-form-radio>
            </b-form-radio-group>

            <MovieAdminCP v-if="state == 'movie'"></MovieAdminCP>
            <TheaterAdminCP v-if="state == 'theater'"></TheaterAdminCP>
            <ShowAdminCP v-if="state == 'show'"></ShowAdminCP> -->

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
import MovieAdminCP from '../components/MovieAdminCP.vue'
import TheaterAdminCP from '../components/TheaterAdminCP.vue'
import ShowAdminCP from '../components/ShowAdminCP.vue';

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