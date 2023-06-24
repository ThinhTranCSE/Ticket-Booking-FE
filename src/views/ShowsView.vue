<template>
    <b-container class="mt-5">
        <b-alert v-if="theaters_selected.length != 0" variant="success" show>Rạp đã chọn: {{ theaters_selected[0].name }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn rạp</b-alert>
        
        <b-alert v-if="movies_selected.length != 0" variant="success" show>Phim đã chọn: {{ movies_selected[0].name }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn phim</b-alert>

        <b-alert v-if="shows_selected.length != 0"  variant="success" show>Suất chiếu đã chọn:  {{ new Date(shows_selected[0].show_time).toLocaleTimeString() }} {{ new Date(shows_selected[0].show_time).toLocaleDateString() }}</b-alert>
        <b-alert v-else variant="danger" show>Bạn chưa chọn suất chiếu</b-alert>
        
        <b-tabs content-class="mt-3" class="mt-5">
            <b-tab title="Phim" active>
                <b-table
                    :items="movies_items"
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
            <b-tab title="Rạp">
                <b-table
                    :items="theaters_items"
                    :fields="theaters_fields"
                    select-mode="single"
                    selectable
                    hover
                    @row-selected="onTheatersRowSelected"
                />
            </b-tab>
            <b-tab title="Suất chiếu" :disabled="theaters_selected.length == 0 || movies_selected.length == 0">
                <b-table
                    :items="shows_items"
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
                <b-button style="float: right" size="md" variant="outline-primary" v-b-modal.successful_modal @click="onSubmitBooking">Đặt vé</b-button>
                <b-modal ok-only id="successful_modal" ok-variant="success" title="Chúc mừng" >
                    Bạn đã đặt vé thành công!!
                </b-modal>
                
                <div style="clear: both"></div>
            </b-tab>
        </b-tabs>
    </b-container>
</template>

<script>
export default {
    name: 'ShowsView',
    data(){
        return {
            movies_selected: [],
            movies_fields: ['name', 'duration', 'poster_image'],
            movies_items: [
                { id: 0, name: 'Mắt Biếc', duration: 120, poster: 'http://localhost:8000/storage/posters/6.jpg'},
                { id: 0, name: 'Mắt Biếc 1', duration: 120, poster: 'http://localhost:8000/storage/posters/6.jpg'},
                { id: 0, name: 'Mắt Biếc 2', duration: 120, poster: 'http://localhost:8000/storage/posters/6.jpg'},
                { id: 0, name: 'Mắt Biếc 3', duration: 120, poster: 'http://localhost:8000/storage/posters/6.jpg'},
                { id: 0, name: 'Mắt Biếc 4', duration: 120, poster: 'http://localhost:8000/storage/posters/6.jpg'},
            ],

            theaters_selected: [],
            theaters_fields: ['name', 'location'],
            theaters_items: [
            { id: 0 , name: 'Galaxy Kinh Dương Vương', location: 'Đây là địa chỉ' },
            { id: 1 , name: 'Galaxy Kinh Dương Vương 1', location: 'Đây là địa chỉ' },
            { id: 2 , name: 'Galaxy Kinh Dương Vương 2', location: 'Đây là địa chỉ' },
            { id: 3 , name: 'Galaxy Kinh Dương Vương 3', location: 'Đây là địa chỉ' },
            { id: 4 , name: 'Galaxy Kinh Dương Vương 4', location: 'Đây là địa chỉ' },
            { id: 5 , name: 'Galaxy Kinh Dương Vương 5', location: 'Đây là địa chỉ' },
            ],

            shows_selected: [],
            shows_fields: ['date', 'time'],
            shows_items: [
                {
                    "id": 1,
                    "show_time": "2023-05-12 09:10:00",
                    "movie_id": 6,
                    "theater_id": 1
                },
                {
                    "id": 1,
                    "show_time": "2023-05-12 09:10:00",
                    "movie_id": 6,
                    "theater_id": 1
                },
                {
                    "id": 1,
                    "show_time": "2023-05-12 09:10:00",
                    "movie_id": 6,
                    "theater_id": 1
                },
                {
                    "id": 1,
                    "show_time": "2023-04-12 09:10:00",
                    "movie_id": 6,
                    "theater_id": 1
                },
                
            ],


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
        onSubmitBooking(){
            console.log('pushed')
        }
    }
}
</script>

<style scoped>

</style>