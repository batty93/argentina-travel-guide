<script setup>
import { ref, computed, watch } from 'vue';
import { useExchangeRate } from '../composables/useExchangeRate';
import { useStorage } from '../composables/useStorage';
import CurrencyChart from './CurrencyChart.vue';
import TheFooter from './TheFooter.vue';

// Allow the user to edit `baseAmount` in the UI if desired later.
const baseAmount = useStorage('base-amount', 100);
const baseCurrency = useStorage('base-currency', 'USD');
const targetCurrency = 'ARS';

const currencies = [
  'AED', 'AUD', 'BOB', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK',
  'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW',
  'MXN', 'MYR', 'NOK', 'NZD', 'PEN', 'PHP', 'PLN', 'PYG', 'RON', 'RUB',
  'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'UYU', 'ZAR'
];

const { convertedAmount, isLoading, error, rate, refresh } = useExchangeRate(
  baseCurrency,
  targetCurrency,
  baseAmount
);

// Graceful Error Handling: Persist last known good rate
const lastRate = ref(null);

watch(rate, (newRate) => {
  if (newRate !== null) {
    lastRate.value = newRate;
  }
});

const effectiveRate = computed(() => rate.value ?? lastRate.value);

// Calculate display amount locally for instant feedback and offline support
const displayAmount = computed(() => {
  if (effectiveRate.value !== null && baseAmount.value !== null) {
    return baseAmount.value * effectiveRate.value;
  }
  return null;
});

const isStale = computed(() => error.value && lastRate.value !== null);
const hasData = computed(() => displayAmount.value !== null);

const chartComponentRef = ref(null);

function downloadChart() {
  if (!chartComponentRef.value?.chartRef?.chart) return;
  const url = chartComponentRef.value.chartRef.chart.toBase64Image();
  const link = document.createElement('a');
  link.href = url;
  link.download = 'currency-chart.png';
  link.click();
}

const chartMode = ref('rate'); // 'rate' | 'inflation'

const chartData = computed(() => {
  const isRate = chartMode.value === 'rate';
  
  const currentYear = new Date().getFullYear();
  const endYear = Math.max(currentYear, 2025);
  const labels = [];
  for (let i = 2019; i <= endYear; i++) {
    labels.push(String(i));
  }

  // Base mock data
  const chartValues = isRate ? [60, 85, 105, 170, 350, 800, 1050] : [53, 36, 50, 94, 211, 250, 180];

  // Project future data if current year > 2025
  while (chartValues.length < labels.length) {
    const last = chartValues[chartValues.length - 1];
    const prev = chartValues[chartValues.length - 2];
    // Simple linear projection based on previous trend
    chartValues.push(last + (last - prev));
  }

  return {
    labels,
    datasets: [
      {
        label: isRate ? `${baseCurrency.value} to ARS Exchange Rate` : 'Annual Inflation (%)',
        backgroundColor: isRate ? '#6CACE4' : '#f87979',
        borderColor: isRate ? '#6CACE4' : '#f87979',
        data: chartValues
      }
    ]
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        footer: () => `Last Updated: ${new Date().toLocaleDateString()}`
      }
    }
  }
}));
</script>

<template>
  <div>
    <section class="card">
        <router-link to="/" class="back-button">&larr; Back to Home</router-link>
        <h1>Currency Rates</h1>
        
        <!-- Initial Loading -->
        <div v-if="isLoading && !hasData">Loading...</div>
        
        <!-- Fatal Error (No data available) -->
        <div v-else-if="error && !hasData" class="error">
            <p><strong>Error:</strong> {{ error }}</p>
            <p>Could not load currency data. Please try again later.</p>
            <button @click="refresh" class="mt-4">Retry</button>
        </div>
        
        <!-- Main Content (Success or Stale Data) -->
        <div v-else-if="hasData">
            <div v-if="isStale" class="error-banner">
                <span>⚠️ Unable to update rates. Showing cached data.</span>
            </div>
            <div class="converter-row" :class="{ 'opacity-50': isLoading }">
                <label for="base-amount">Amount:</label>
                <input id="base-amount" type="number" v-model.number="baseAmount" class="ml-2" />
                <select v-model="baseCurrency" class="ml-2">
                    <option v-for="currency in currencies" :key="currency" :value="currency">
                        {{ currency }}
                    </option>
                </select>
            </div>
            <p class="converted-value" :class="{ 'opacity-50': isLoading }">{{ displayAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) }} {{ targetCurrency }}</p>
            <p class="last-updated">Rate: {{ effectiveRate !== null ? Number(effectiveRate).toFixed(4) : '—' }}</p>
            <button @click="refresh" class="mt-4" :disabled="isLoading">{{ isLoading ? 'Refreshing...' : 'Refresh' }}</button>
        </div>
        <div class="chart-controls">
            <button 
                @click="chartMode = 'rate'" 
                :class="{ active: chartMode === 'rate' }"
            >Exchange Rate</button>
            <button 
                @click="chartMode = 'inflation'" 
                :class="{ active: chartMode === 'inflation' }"
            >Inflation</button>
            <button @click="downloadChart">Download Chart</button>
        </div>
        <CurrencyChart ref="chartComponentRef" :chart-data="chartData" :chart-options="chartOptions" :is-loading="isLoading" />
        <p class="mt-4"><a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a></p>
    </section>
    <TheFooter />
  </div>
</template>

<style scoped>
.back-button {
    display: inline-block;
    margin-bottom: 1rem;
    text-decoration: none;
    color: #6CACE4;
    font-weight: bold;
}
</style>
