<template>
    <b-container>
        <p style="color: black">  {{ $store.state.user.id }} {{ booking_items }}</p>
        <b-table
            :items="booking_items"
        />
    </b-container>
</template>

<script>
import httpCommon from '../http-common'
export default {
    name: 'UserProfile',
    data(){
        return {
            booking_fields: [],
            booking_items: [],
        }
    },
    async created(){
        try{
            const { data } = await httpCommon.get(`/bookings/user/${this.$store.state.user.id}`, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                }
            });
            this.booking_items = data;
        }        
        catch(err){
            console.log(err);
        }
    }

}
</script>

<style scoped>

</style>