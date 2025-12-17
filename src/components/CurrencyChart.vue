<script setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false
    })
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const chartRef = ref(null)

defineExpose({ chartRef })
</script>

<template>
  <div class="chart-container">
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>
    <Line v-else ref="chartRef" :data="chartData" :options="chartOptions" />
  </div>
</template>