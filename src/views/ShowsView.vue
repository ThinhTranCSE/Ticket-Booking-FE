<template>
    <b-container class="mt-5">
        <b-alert v-if="theaters_selected.length != 0" variant="success" show>Rạp đã chọn: {{ theaters_selected[0].name }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn rạp</b-alert>
        
        <b-alert v-if="movies_selected.length != 0" variant="success" show>Phim đã chọn: {{ movies_selected[0].name }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn phim</b-alert>

        <b-alert v-if="shows_selected.length != 0"  variant="success" show>Suất chiếu đã chọn:  {{ new Date(shows_selected[0].show_time).toLocaleTimeString() }} {{ new Date(shows_selected[0].show_time).toLocaleDateString() }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn suất chiếu</b-alert>
        
        <b-form-group label="Tìm kiếm suất chiếu theo:" class="mt-5">
            <b-form-radio v-model="isStartSearchByMovie" name="search-type-radios" :value="true">Phim</b-form-radio>
            <b-form-radio v-model="isStartSearchByMovie" name="search-type-radios" :value="false">Rạp</b-form-radio>
        </b-form-group>


        <b-tabs content-class="mt-3" class="mt-5">
            <b-tab title="Phim" :active="isStartSearchByMovie" :disabled="isStartSearchByMovie ? false : (theaters_selected.length == 0 ? true : false)">
                <b-table
                    :items="moviesItems"
                    :fields="movies_fields"
                    select-mode="single"
                    selectable
                    hover
                    @row-selected="onMoviesRowSelected"
                >
                    <template #cell(poster_image)="{ item }">
                        <b-img :src="item.poster" width="100"></b-img>
                    </template>
                </b-table>
            </b-tab>
            <b-tab title="Rạp" :active="!isStartSearchByMovie" :disabled="!isStartSearchByMovie ? false : (movies_selected.length == 0 ? true : false)">
                <b-table
                    :items="theatersItems"
                    :fields="theaters_fields"
                    select-mode="single"
                    selectable
                    hover
                    @row-selected="onTheatersRowSelected"
                />
            </b-tab>
            <b-tab title="Suất chiếu" :disabled="theaters_selected.length == 0 || movies_selected.length == 0">
                <b-table
                    :items="showsItems"
                    :fields="shows_fields"
                    select-mode="single"
                    selectable
                    hover
                    @row-selected="onShowsRowSelected"
                >
                    <template #cell(date)="{ item }">
                        {{ new Date(item.show_time.split(' ')[0]).toLocaleDateString()  }}
                    </template>
                    <template #cell(time)="{ item }">
                        {{ item.show_time.split(' ')[1].slice(0, 5) }}
                    </template>
                </b-table>
                <b-button style="float: right" size="md" variant="outline-primary" @click="onSubmitBooking">Đặt vé</b-button>
                <b-modal ok-only ref="successful-modal" ok-variant="success" title="Chúc mừng" >
                    Bạn đã đặt vé thành công!!
                </b-modal>
                <b-modal ref="failed-modal" ok-variant="danger" title="Thất bại" >
                    Đặt vé không thành công!!
                </b-modal>
                
                <div style="clear: both"></div>
            </b-tab>
        </b-tabs>
    </b-container>
</template>

<script>
import httpCommon from '../http-common';
export default {
    name: 'ShowsView',
    data(){
        return {
            movies_selected: [],
            movies_fields: ['name', 'duration', 'poster_image'],
            movies_data : [],

            theaters_selected: [],
            theaters_fields: ['name', 'location'],
            theaters_data: [],

            shows_selected: [],
            shows_fields: ['date', 'time'],
            shows_data: [],

            isStartSearchByMovie: true,
        }
    },
    computed: {
        moviesItems(){
            if(this.isStartSearchByMovie){
                return this.movies_data;
            }

            if(this.theaters_selected.length == 0){
                return this.movies_data;
            }
            const movie_ids = this.shows_data.filter((show) => {
                return this.theaters_selected[0].id == show.theater_id;
            })
            .map((show) => {
                return show.movie_id;
            });

            const movie_data_filtered = this.movies_data.filter((movie) => {
                return movie_ids.includes(movie.id);
            })

            return movie_data_filtered;
        },
        theatersItems(){
            if(!this.isStartSearchByMovie){
                return this.theaters_data;
            }

            if(this.movies_selected.length == 0){
                return this.theaters_data;
            }
            const theater_ids = this.shows_data.filter((show) => {
                return this.movies_selected[0].id == show.movie_id;
            })
            .map((show) => {
                return show.theater_id;
            })
            const theater_data_filtered = this.theaters_data.filter((theater) => {
                return theater_ids.includes(theater.id);
            })
            return theater_data_filtered;
        },
        showsItems(){
            return this.shows_data.filter((show) => {
                if(this.movies_selected.length == 0 || this.theaters_selected.length == 0) return true;
                return show.movie_id == this.movies_selected[0].id && show.theater_id == this.theaters_selected[0].id;
            })
        }
    },
    methods: {
        onTheatersRowSelected(items) {
            this.theaters_selected = items;
        },
        onMoviesRowSelected(items){
            this.movies_selected = items;
        },
        onShowsRowSelected(items){
            this.shows_selected = items;
        },
        async onSubmitBooking(){
            if(!this.$store.state.token){
                this.$router.push({path: '/signin'});
            }
            try{
                const { data } = await httpCommon.post('bookings', {
                    show_id: this.shows_selected[0].id,
                    user_id: this.$store.state.user.id
                });
                this.$refs['successful-modal'].show();
                console.log(data);
            }
            catch(err){
                console.log(err);
                this.$refs['failed-modal'].show();
            }

        }
    },
    async created(){
        try{
            const [movies_res, theaters_res, shows_res] = await Promise.all([
                httpCommon.get('/movies'),
                httpCommon.get('/theaters'),
                httpCommon.get('/shows'),
            ]);
            this.movies_data = movies_res.data.data;
            this.theaters_data = theaters_res.data.data;
            this.shows_data = shows_res.data.data;
        }
        catch(err){
            console.log(err);
        }
    }

}
</script>

<style scoped>

</style>