<template>
    <b-container>
        <UsersBookingsTable
        :items="users_info"
        :busy="is_busy"
        />
    </b-container>
</template>

<script>
import httpCommon from '../http-common';
import UsersBookingsTable from '../components/Dashboard/UsersBookingsTable.vue';
export default {
    name: 'UsersBookingsDasboard',
    components: {
        UsersBookingsTable
    },
    data(){
        return {
            users_info: [],

            is_busy: false,
        }
    },
    async created(){
        try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const { data } = await httpCommon.get('/users');

            const users_info_fetch_data = data.data;
            this.users_info = users_info_fetch_data;

            this.is_busy = false;
        }
        catch(err){
            console.log(err);
        }
    }
}
</script>