<template>
    <b-container class="mt-5">
        <h5>Số vé trong 30 ngày gần nhất:</h5>
        <LineChart 
        :labels="line_chart_labels" 
        :data="line_chart_data" 
        label="Số vé" 
        :generateRandomColor="generateRandomColor" 
        class="mb-5"></LineChart>
        <b-row>
            <b-col>
                <h5>Số vé bán của phim:</h5>
                <PieChart 
                :labels="pie_chart_labels" 
                :data="pie_chart_data" 
                :generateRandomColor="generateRandomColor" 
                class="mb-5"></PieChart>
            </b-col>
            <b-col>
                <h5>Số vé bán được của rạp:</h5>
                <BarChart 
                :labels="bar_chart_labels" 
                :data="bar_chart_data" 
                label="Số vé" 
                :generateRandomColor="generateRandomColor"
                class="mb-5"></BarChart>
            </b-col>
        </b-row>
    </b-container>
 </template>
 
 <script>
 import BarChart from '../components/Chart/BarChart.vue';
 import LineChart from '../components/Chart/LineChart.vue';
 import PieChart from '../components/Chart/PieChart.vue';
import httpCommon from '../http-common';
 export default {
    name: 'Dashboard',
    components: {
        BarChart,
        LineChart,
        PieChart
    },
    data(){
        return {
            line_chart_data: [],
            line_chart_labels: [],

            pie_chart_data: [],
            pie_chart_labels: [],

            bar_chart_data: [],
            bar_chart_labels: [],
        }
    },
    async created(){
        try{
            const [line_chart_res, pie_chart_res, bar_chart_res] = await Promise.all([
                httpCommon.get('/dashboard/line'),
                httpCommon.get('/dashboard/pie'),
                httpCommon.get('/dashboard/bar')
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
    }
 }
 </script>
 
 <style scoped>
 
 </style>