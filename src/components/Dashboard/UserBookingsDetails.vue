<template>
    <b-container>
        <b-table
        :items="items"
        :fields="fields"
        :busy="isBusy"
        >
        <template #table-busy>
            <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
            </div>
        </template>
        <template #cell(poster_image)="{ item }">
            <b-img :src="item.poster" width="100"></b-img>
        </template>
        </b-table>
    </b-container>
</template>

<script>
import httpCommon from '../../http-common';
export default {
    name: 'UserBookingsDetails',
    props: {
        userId: Number,
    },
    data(){
        return {
            id: this.userId,
            items: [],
            fields: ['booking_date', 'show_time', 'movie_name', 'theater_name', 'poster_image'],
            isBusy: false,
        }
    },
    methods: {

    },
    async created(){
        try{
            this.isBusy = true;
            setTimeout(() => this.isBusy = false, 3000);

            const { data } = await httpCommon.get(`/bookings/user/${this.id}`);
            this.items = data.data;

            this.isBusy = false;
        }
        catch(err){
            console.log(err);
        }
    }
}
</script>