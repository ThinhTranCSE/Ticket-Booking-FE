<template>
    <b-container>
        <b-collapse id="theater-form">
            <TheaterForm 
            :onFormSubmit="onCreateTheaterFormSubmit"
            successfulMessage="Thêm thành công!!"
            failedMessage="Thêm không thành công!!"
            @create-theater="createTheaterEvent"
            ></TheaterForm>
        </b-collapse>
        <b-button v-b-toggle.theater-form variant="primary" class="mt-5">Thêm rạp mới</b-button>

        <b-table
            class="mt-3"
            :items="items"
            :fields="fields"
            hover
        >
            <template #cell(manage)="{ toggleDetails, item}">
                <div>
                    <b-button @click="toggleDetails" variant="primary">Sửa</b-button>
                    <b-button variant="danger" @click="() => onDeleteTheater(item.id)">Xóa</b-button>
                </div>
            </template>
            <template #row-details="{ item, index }">
                <TheaterForm 
                :initialName="item.name" 
                :initialLocation="item.location" 

                :onFormSubmit="(data) => onUpdateTheaterFormSubmit(data, item.id)"
                successfulMessage="Sửa thành công!!"
                failedMessage="Sửa không thành công!!"
                @update-theater="(e) => updateTheaterEvent(e, index)"
                ></TheaterForm>
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
import TheaterForm from './TheaterForm.vue'
export default {
    name: 'TheaterAdminCP',
    components:{
        TheaterForm,
    },
    data(){
        return {
            items: [],
            fields: ['name', 'location', 'manage'],
            successful_message: '',
            failed_message: '',
        }
    },
    methods: {
        async onCreateTheaterFormSubmit(data){
            return httpCommon.post('theaters', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            });
        },
        async onUpdateTheaterFormSubmit(data, id){
            return httpCommon.post(`theaters/${id}?_method=PATCH`, data, {
                    headers: {
                            'Content-Type': 'multipart/form-data'
                    }
            });
        },
        async onDeleteTheater(id){
            try{
                const { data } = await httpCommon.delete(`theaters/${id}`);
                const deleted_theater = data.data;
                this.items.splice(this.items.indexOf(deleted_theater), 1);  
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
        updateTheaterEvent(updated_theater, old_theater_index){
            this.items.splice(old_theater_index, 1, updated_theater);
        },
        createTheaterEvent(created_theater){
            this.items.push(created_theater);
        }
        
    },
    async created(){
        try{
            const { data } = await httpCommon.get('theaters');
            this.items = data.data;
        }
        catch(err){
            console.log(err);
        }
    }   
 }
 </script>
 
 <style scoped>
 
 </style>