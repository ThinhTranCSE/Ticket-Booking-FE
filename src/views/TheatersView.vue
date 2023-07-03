<template>
    <b-container>
        <h2 class="mt-5">Danh sách rạp phim</h2>
        <b-table 
        striped 
        hover 
        :items="this.theater_data" 
        :fields="fields" 
        class="mt-5" 
        bordered
        :busy="is_busy"
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
        </b-table>
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
            is_busy: false,
        }
    },
    async created(){
        try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const { data } = await httpCommon.get('theaters');
            this.theater_data = data.data;

            this.is_busy = false;
        }
        catch(err){
            console.log(err);
        }
    }
}
</script>

<style scoped>

</style>