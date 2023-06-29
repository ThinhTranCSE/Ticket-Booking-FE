<template>
    <Pie
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs/legacy'
  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    props: {
      chartId: {
        type: String,
        default: 'pie-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      },

      labels: {
        type: Array,
        default: () => []
      },

      data: {
        type: Array,
        default: () => []
      },

      generateRandomColor: {
        type: Function
      }
    },
    data() {
      return {
        chartData: {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: [],
              data: this.data
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    watch: {
      data(val){
        this.chartData.datasets[0].data = val;
      },
      labels(val){
        this.chartData.labels = val;
        this.chartData.datasets[0].backgroundColor = this.chartData.labels.map(label => this.generateRandomColor());
        console.log(this.chartData.datasets)
      }
    },
    methods: {
      
    }
  }
  </script>
  