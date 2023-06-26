<template>
    <b-container>
        <h2 class="mt-5">Danh sách rạp phim</h2>
        <b-table striped hover :items="this.theater_data" :fields="fields" class="mt-5" bordered></b-table>
    </b-container>
</template>

<script>
import httpCommon from '../http-common';
export default {
    name: 'TheatersView',
    data(){
        return{
            fields: ['name', 'location'],
            theater_data: [],
        }
    },
    async created(){
        try{
            const { data } = await httpCommon.get('theaters');
            this.theater_data = data.data;
        }
        catch(err){
            console.log(err);
        }
    }
}
</script>

<style scoped>

</style>