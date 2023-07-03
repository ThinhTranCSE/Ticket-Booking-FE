<template>
    <b-container>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-3">
            <b-form-group
            id="input-group-1"
            label="Theater:"
            label-for="input-1"
            >
                <b-form-select
                id="input-1"
                v-model="form.theater_id"
                :options="theatersOptions"
                required
                ></b-form-select>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="Movie:"
            label-for="input-2"
            >
                <b-form-select
                id="input-2"
                v-model="form.movie_id"
                :options="moviesOptions"
                required
                ></b-form-select>
            </b-form-group>


            <label for="input-3">Date:</label>
            <b-form-datepicker 
            id="input-3" 
            v-model="date"
            class="mb-3"
            ></b-form-datepicker>


            <label for="input-4">Time:</label>
            <b-form-timepicker 
            id="input-4" 
            v-model="time"
            class="mb-3"
            ></b-form-timepicker>


            <b-button type="submit" variant="primary" style="float: right">Submit</b-button>
            <b-button type="reset" variant="danger" style="float: right">Reset</b-button>
            <div style="clear: both"></div>
        </b-form>

        <b-modal ok-only ref="successful-modal" ok-variant="success" title="Chúc mừng" >
            Thêm thành công!!
        </b-modal>
        <b-modal ref="failed-modal" ok-variant="danger" title="Thất bại" >
            Thêm không thành công!!
        </b-modal>
    </b-container> 
</template>

<script>
import httpCommon from '../../http-common';
export default {
    name: 'ShowForm',
    props:{
        
    },
    data(){
        return{
            form: {
                theater_id: null,
                movie_id: null,
                show_time: ''
            },
            theaters: [],
            movies: [],
            show: true,
            date: '',
            time: ''
        }
    },
    methods:{
        async onSubmit(event){
            event.preventDefault();
            try{
                const { data } = await httpCommon.post('shows', this.form)
                .finally(() => {
                    this.form.theater_id = null;
                    this.form.movie_id = null;
                    this.date = '';
                    this.time = '';       

                    this.show = false
                    this.$nextTick(() => {
                        this.show = true
                    })
                })
                this.$refs['successful-modal'].show();
                this.$emit('create-show', data.data);
            }
            catch(err){
                console.log(err);
                this.$refs['failed-modal'].show();
            }
        },    
        onReset(event){
            event.preventDefault();

            this.form.theater_id = null;
            this.form.movie_id = null;
            this.date = '';
            this.time = '';            

            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    },
    async created(){
        try{
            const [theatersRes, moviesRes] = await Promise.all([
                httpCommon.get('theaters'),
                httpCommon.get('movies')
            ]);
            this.theaters = theatersRes.data.data;
            this.movies = moviesRes.data.data; 

        }
        catch(err){
            console.log(err);
        }
    },
    computed: {
        theatersOptions(){
            return [
                {
                    text: 'Choose theater...',
                    value: null
                },       
                ...this.theaters.map((theater) => {
                    return {
                        text: theater.name,
                        value: theater.id
                    }
                })        
            ];
        },
        moviesOptions(){
            return [
                {
                    text: 'Choose movie...',
                    value: null
                },
                ...this.movies.map(movie => {
                    return {
                        text: movie.name,
                        value: movie.id
                    }
                })
            ]
        },
    },
    watch: {
        date(val){
            if(val || this.time == '') return this.form.show_time = '';
            return this.form.show_time = val + ' ' + this.time;
        },
        time(val){
            if(this.date == '' || val == '') return this.form.show_time = '';
            return this.form.show_time = this.date + ' ' + val;
        }
    }

}
</script>