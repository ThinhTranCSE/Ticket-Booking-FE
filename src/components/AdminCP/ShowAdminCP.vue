<template>
    <b-container>
        <b-collapse id="show-form">
            <ShowForm @create-show="createShowEvent"></ShowForm>
        </b-collapse>
        <b-button v-b-toggle.show-form variant="primary" class="mt-5">Thêm suất chiếu mới</b-button>
        
        <b-table
            class="mt-3"
            :items="items"
            :fields="fields"
            hover
            :busy="is_busy"
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(date)="{ item }">
                {{ new Date(item.show_time.split(' ')[0]).toLocaleDateString()  }}
            </template>

            <template #cell(time)="{ item }">
                {{ item.show_time.split(' ')[1].slice(0, 5) }}
            </template>

            <template #cell(poster_image)="{ item }">
                <b-img :src="item.movie_poster" width="100"></b-img>
            </template>

            <template #cell(manage)="{ item }">
                <b-button variant="danger" @click="() => onDeleteShow(item.id)">Xóa</b-button>
            </template>
        </b-table>

        <b-modal ok-only ref="successful-modal" ok-variant="success" title="Chúc mừng" >
            {{ successful_message }}
        </b-modal>
        <b-modal ref="failed-modal" ok-variant="danger" title="Thất bại" >
            {{ failed_message }}
        </b-modal>
    </b-container>
</template>

<script>
import httpCommon from '../../http-common';
import ShowForm from './ShowForm.vue';

export default {
    name: 'ShowAdminCP',
    components: {
        ShowForm
    },
    data(){
        return {
            items: [],
            fields: [ 'time', 'date', 'movie_name', 'poster_image', 'theater_name', 'manage'],
            successful_message: '',
            failed_message: '',
            is_busy: false,
        }
    },
    async created(){
        try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const { data } = await httpCommon.get('shows/details');
            this.items = data.data;
            console.log(this.items);

            this.is_busy = false;
        }
        catch(err){
            console.log(err);
        }
    },
    methods:{
        async onDeleteShow(id){
            try{
                const { data } = await httpCommon.delete(`shows/${id}`);
                const deleted_show = data.data;
                this.items.splice(this.items.findIndex(item => item.id == deleted_show.id), 1);  
                this.showSuccessfulMessage('Xóa thành công!!'); 
            }
            catch(err){
                this.showFailedMessage('Xoá không thành công!!');
                console.log(err);
            }
        },
        showSuccessfulMessage(msg){
            this.successful_message = msg;
            this.$refs['successful-modal'].show();
        },
        showFailedMessage(msg){
            this.failed_message = msg;
            this.$refs['failed-modal'].show();
        },
        async createShowEvent(show){
            const { data } = await httpCommon.get(`shows/details/${show.id}`);
            console.log(data.data);
            this.items.push(data.data);
        }
    }
}
</script>