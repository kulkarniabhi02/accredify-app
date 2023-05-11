<template>
  <div>
    <h4>Career Goals</h4>
    <div class="chart-container text-center">
      <label class="mb-3">Your Progress</label>
      <Doughnut class="mb-5" :data="chartData" :options="chartOptions" />
      <label>I want to become a</label>
      <h3 class="mb-6">{{ role }}</h3>
      <a href="#" class="role-insights">View Insights</a>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ChartComponent',
  components: {
    Doughnut
  },
  props: {
    chartData: {
        type: Object,
        required: true
      },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    role: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  canvas {
    width: 400px !important;
    height: 400px !important;
  }
  .chart-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 2rem;
    margin-right: 2rem;
  }
  .role-insights {
    color: #6C00FF;
    text-decoration: none;
  }
</style>
