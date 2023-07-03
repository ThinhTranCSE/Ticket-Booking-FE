<template>
    <b-container class="mt-5">
        <b-table
            :items="booking_items"
            :fields="booking_fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hover
        >
        <template #cell(poster_image)="{ item }">
            <b-img :src="item.poster" width="100"></b-img>
        </template>
    </b-table>
    </b-container>
</template>

<script>
import httpCommon from '../http-common'
export default {
    name: 'UserProfile',
    data(){
        return {
            booking_fields: [{key: 'booking_date', sortable: true}, 'show_time', 'movie_name', 'theater_name', 'poster_image'],
            booking_items: [],
            sortBy: 'booking_date',
            sortDesc: false,
        }
    },
    async created(){
        try{
            const { data } = await httpCommon.get(`/bookings/user/${this.$store.state.user.id}`);
            this.booking_items = data.data;
        }        
        catch(err){
            console.log(err);
        }
    }

}
</script>

<style scoped>

</style>