<template>
    <b-container>
        <b-collapse id="movie-form">
            <MovieForm 
            :onFormSubmit="onCreateMovieFormSubmit"
            successfulMessage="Thêm thành công!!"
            failedMessage="Thêm không thành công!!"
            @create-movie="createMovieEvent"
            ></MovieForm>
        </b-collapse>
        <b-button v-b-toggle.movie-form variant="primary" class="mt-5">Thêm phim mới</b-button>

        <b-table
            class="mt-3"
            :items="items"
            :fields="fields"
            hover
        >
            <template #cell(poster_image)="{ item }">
                <b-img :src="item.poster" width="100"></b-img>
            </template>

            <template #cell(manage)="{ toggleDetails, item}">
                <div>
                    <b-button @click="toggleDetails" variant="primary">Sửa</b-button>
                    <b-button variant="danger" @click="() => onDeleteMovie(item.id)">Xóa</b-button>
                </div>
            </template>
            <template #row-details="{ item, index }">
                <MovieForm 
                :initialName="item.name" 
                :initialDescription="item.description" 
                :initialDuration="item.duration" 
                :onFormSubmit="(data) => onUpdateMovieFormSubmit(data, item.id)"
                successfulMessage="Sửa thành công!!"
                failedMessage="Sửa không thành công!!"
                @update-movie="(e) => updateMovieEvent(e, index)"
                ></MovieForm>
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
import MovieForm from './MovieForm.vue'
export default {
    name: 'MovieAdminCP',
    components:{
        MovieForm,
    },
    data(){
        return {
            items: [],
            fields: ['name', 'poster_image', 'manage'],
            successful_message: '',
            failed_message: '',
        }
    },
    methods: {
        async onCreateMovieFormSubmit(data){
            return httpCommon.post('movies', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            });
        },
        async onUpdateMovieFormSubmit(data, id){
            return httpCommon.post(`movies/${id}?_method=PATCH`, data, {
                    headers: {
                            'Content-Type': 'multipart/form-data'
                    }
            });
        },
        async onDeleteMovie(id){
            try{
                const { data } = await httpCommon.delete(`movies/${id}`);
                const deleted_movie = data.data;
                this.items.splice(this.items.indexOf(deleted_movie), 1);  
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
        updateMovieEvent(updated_movie, old_movie_index){
            this.items.splice(old_movie_index, 1, updated_movie);
        },
        createMovieEvent(created_movie){
            this.items.push(created_movie);
        }
        
    },
    async created(){
        try{
            const { data } = await httpCommon.get('movies');
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