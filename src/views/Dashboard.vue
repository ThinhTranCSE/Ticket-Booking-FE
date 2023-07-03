<template>
    <b-container class="mt-5">
        <b-form @submit="onSubmit" v-if="show" class="mt-3">
            <b-form-group
            id="input-group-1"
            label="From:"
            label-for="input-1"
            >
                <b-form-datepicker 
                id="input-1" 
                v-model="form.date_from"
                class="mb-3"
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
            id="input-group-2"
            label="To:"
            label-for="input-2"
            >
                <b-form-datepicker 
                id="input-2" 
                v-model="form.date_to"
                class="mb-3"
                ></b-form-datepicker>
            </b-form-group>

            <b-button type="submit" variant="primary" style="float: right">Lọc</b-button>
            <div style="clear: both"></div>
        </b-form>
        <h5>Số vé bán được:</h5>
        <b-overlay :show="is_busy">
            <LineChart 
            :labels="line_chart_labels" 
            :data="line_chart_data" 
            label="Số vé" 
            :generateRandomColor="generateRandomColor" 
            class="mb-5"></LineChart>
        </b-overlay>
        <b-row>
            <b-col>
                <h5>Số vé bán của phim:</h5>
                <b-overlay :show="is_busy">
                    <PieChart 
                    :labels="pie_chart_labels" 
                    :data="pie_chart_data" 
                    :generateRandomColor="generateRandomColor" 
                    class="mb-5"></PieChart>
                </b-overlay>
            </b-col>
            <b-col>
                <h5>Số vé bán được của rạp:</h5>
                <b-overlay :show="is_busy">
                    <BarChart 
                    :labels="bar_chart_labels" 
                    :data="bar_chart_data" 
                    label="Số vé" 
                    :generateRandomColor="generateRandomColor"
                    class="mb-5"></BarChart>
                </b-overlay>
            </b-col>
        </b-row>
        <!-- <b-row>
            <h5>Danh sách user: </h5>
            <UsersBookingsTable
            :items="users_info"
            :busy="is_busy"
            ></UsersBookingsTable>
        </b-row> -->
    </b-container>
 </template>
 
 <script>
 import BarChart from '../components/Dashboard/BarChart.vue';
 import LineChart from '../components/Dashboard/LineChart.vue';
 import PieChart from '../components/Dashboard/PieChart.vue';
import httpCommon from '../http-common';
// import UsersBookingsTable from '../components/Dashboard/UsersBookingsTable.vue';

 export default {
    name: 'Dashboard',
    components: {
        BarChart,
        LineChart,
        PieChart,
        // UsersBookingsTable
    },
    data(){
        return {
            line_chart_data: [],
            line_chart_labels: [],

            pie_chart_data: [],
            pie_chart_labels: [],

            bar_chart_data: [],
            bar_chart_labels: [],

            users_info: [],

            is_busy: false,

            form: {
                date_from: '',
                date_to: ''
            },

            show: true,
        }
    },
    async created(){
        try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const [
                line_chart_res, 
                pie_chart_res, 
                bar_chart_res, 
                // users_info_res
            ] = await Promise.all([
                httpCommon.get('/dashboard/line'),
                httpCommon.get('/dashboard/pie'),
                httpCommon.get('/dashboard/bar'),
                // httpCommon.get('/users')
            ])

            const line_chart_fetch_data = line_chart_res.data.data;
            this.line_chart_data = line_chart_fetch_data.map(record => record.booking_count);
            this.line_chart_labels = line_chart_fetch_data.map(record => record.date);

            const pie_chart_fetch_data = pie_chart_res.data.data;
            this.pie_chart_data = pie_chart_fetch_data.map(record => record.booking_count);
            this.pie_chart_labels = pie_chart_fetch_data.map(record => record.movie_name);

            const bar_chart_fetch_data = bar_chart_res.data.data;
            this.bar_chart_data = bar_chart_fetch_data.map(record => record.booking_count);
            this.bar_chart_labels = bar_chart_fetch_data.map(record => record.theater_name);

            // const users_info_fetch_data = users_info_res.data.data;
            // this.users_info = users_info_fetch_data;

            this.is_busy = false;
        }
        catch(err){
            console.log(err);
        }
    },
    methods: {
        generateRandomColor() {
            const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
            let code = "";
            for(let i=0; i<6; i++){
            code += hexArray[Math.floor(Math.random()*16)];
            }
            return `#${code}`;
        },
        async onSubmit(event){
            event.preventDefault();
            try{
            this.is_busy = true;
            setTimeout(() => this.is_busy = false, 3000);

            const [line_chart_res, pie_chart_res, bar_chart_res] = await Promise.all([
                httpCommon.get('/dashboard/line', {
                    params: {
                        from: this.form.date_from,
                        to: this.form.date_to
                    }
                }),
                httpCommon.get('/dashboard/pie', {
                    params: {
                        from: this.form.date_from,
                        to: this.form.date_to
                    }
                }),
                httpCommon.get('/dashboard/bar', {
                    params: {
                        from: this.form.date_from,
                        to: this.form.date_to
                    }
                }),
            ])

            const line_chart_fetch_data = line_chart_res.data.data;
            this.line_chart_data = line_chart_fetch_data.map(record => record.booking_count);
            this.line_chart_labels = line_chart_fetch_data.map(record => record.date);

            const pie_chart_fetch_data = pie_chart_res.data.data;
            this.pie_chart_data = pie_chart_fetch_data.map(record => record.booking_count);
            this.pie_chart_labels = pie_chart_fetch_data.map(record => record.movie_name);

            const bar_chart_fetch_data = bar_chart_res.data.data;
            this.bar_chart_data = bar_chart_fetch_data.map(record => record.booking_count);
            this.bar_chart_labels = bar_chart_fetch_data.map(record => record.theater_name);

            this.is_busy = false;
            }
            catch(err){
                console.log(err);
            }
        },
    }
 }
 </script>
 
 <style scoped>
 
 </style>