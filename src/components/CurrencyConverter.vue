<script setup>
import { ref, onMounted } from 'vue';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const rates = ref(null);
const loading = ref(true);
const fetchError = ref(null);
const lastUpdated = ref('');

// IMPORTANT: Replace with your actual API key
// It's best to store this in an environment variable
const apiKey = import.meta.env.VITE_FREECURRENCYAPI_KEY;
const freecurrencyapi = new Freecurrencyapi(apiKey);

async function loadRates() {
    loading.value = true;
    fetchError.value = null;
    try {
        const response = await freecurrencyapi.latest({
            base_currency: 'USD',
            currencies: 'ARS,EUR,BRL'
        });
        rates.value = response.data;
        lastUpdated.value = new Date().toLocaleString();
    } catch (error) {
        console.error("Currency API Error:", error);
        fetchError.value = error.message || 'An unknown error occurred.';
    } finally {
        loading.value = false;
    }
}

// Load rates when the component is first mounted
onMounted(loadRates);
</script>

<template>
    <section class="card">
        <h1>Currency Rates</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="fetchError" class="error">
            <p><strong>Error:</strong> {{ fetchError }}</p>
            <p>Could not load currency data. Please try again later.</p>
        </div>
        <div v-else-if="rates">
            <ul class="rates-list-items">
                <li v-for="(rate, code) in rates" :key="code">
                    <strong>{{ code }}:</strong> {{ parseFloat(rate).toFixed(4) }}
                </li>
            </ul>
            <p class="last-updated">Last updated: {{ lastUpdated }}</p>
            <button @click="loadRates" class="mt-4">Refresh</button>
        </div>
    </section>
</template>

<style scoped>
/* You can add component-specific styles here */
.card {
    background: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    max-width: 400px;
    margin: 2rem auto;
}

.error {
    color: red;
}

.rates-list-items {
    list-style: none;
    padding: 0;
}

.last-updated {
    font-size: 0.8rem;
    color: #666;
    margin-top: 1rem;
}

.mt-4 {
    margin-top: 1rem;
}
</style>