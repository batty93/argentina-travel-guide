import { ref, watch, toValue } from 'vue';

export function useExchangeRate(baseCurrency, targetCurrency, amount) {
    const convertedAmount = ref(null);
    const rate = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

    async function fetchRate() {
        const base = toValue(baseCurrency);
        const target = toValue(targetCurrency);
        const val = toValue(amount);

        if (!apiKey) {
            error.value = 'API key is missing. Please set VITE_EXCHANGE_RATE_API_KEY.';
            return;
        }

        if (!base || !target) return;

        isLoading.value = true;
        error.value = null;

        try {
            // Using ExchangeRate-API (Standard or Pair endpoint)
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}/${val}`);
            const data = await response.json();

            if (data.result === 'success') {
                rate.value = data.conversion_rate;
                convertedAmount.value = data.conversion_result;
            } else {
                throw new Error(data['error-type'] || 'Failed to fetch exchange rate');
            }
        } catch (err) {
            error.value = err.message;
            convertedAmount.value = null;
            rate.value = null;
        } finally {
            isLoading.value = false;
        }
    }

    watch(
        [() => toValue(baseCurrency), () => toValue(targetCurrency), () => toValue(amount)],
        () => fetchRate(),
        { immediate: true }
    );

    return {
        convertedAmount,
        rate,
        isLoading,
        error,
        refresh: fetchRate,
    };
}