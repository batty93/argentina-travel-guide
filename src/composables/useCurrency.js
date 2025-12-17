import { ref, isRef, computed, watch, onBeforeUnmount } from 'vue';

export function useCurrency(baseCurrency, targetCurrency, baseAmount = 1, options = {}) {
    const baseCurrencyRef = isRef(baseCurrency) ? baseCurrency : ref(baseCurrency);
    const targetCurrencyRef = isRef(targetCurrency) ? targetCurrency : ref(targetCurrency);
    const baseAmountRef = isRef(baseAmount) ? baseAmount : ref(baseAmount);

    const rate = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    let abortController = null;
    let refreshTimer = null;
    const autoRefreshMs = options.autoRefreshMs || 0;

    async function fetchRate() {
        if (abortController) {
            abortController.abort();
            abortController = null;
        }
        abortController = new AbortController();
        const signal = abortController.signal;

        isLoading.value = true;
        error.value = null;
        rate.value = null;
        try {
            const base = encodeURIComponent(baseCurrencyRef.value);
            const currencies = encodeURIComponent(targetCurrencyRef.value);
            const url = `/api/latest?base=${base}&currencies=${currencies}`;

            const res = await fetch(url, { signal });
            if (!res.ok) {
                let bodyText = await res.text();
                try { bodyText = JSON.parse(bodyText); } catch { }
                throw new Error((bodyText && bodyText.error) || `HTTP ${res.status}: ${res.statusText}`);
            }

            const json = await res.json();
            const payload = json.data || json.rates || json;
            const value = payload && payload[targetCurrencyRef.value];
            if (value == null || Number.isNaN(Number(value))) {
                throw new Error(`No rate returned for ${targetCurrencyRef.value}`);
            }
            rate.value = Number(value);
        } catch (err) {
            if (err.name === 'AbortError') {
                // ignore
            } else {
                error.value = err.message || String(err);
            }
        } finally {
            isLoading.value = false;
            abortController = null;
        }
    }

    function refresh() {
        return fetchRate();
    }

    function startAutoRefresh() {
        if (!autoRefreshMs || refreshTimer) return;
        refreshTimer = setInterval(fetchRate, autoRefreshMs);
    }
    function clearAutoRefresh() {
        if (refreshTimer) {
            clearInterval(refreshTimer);
            refreshTimer = null;
        }
    }

    watch([baseCurrencyRef, targetCurrencyRef], () => {
        fetchRate();
    }, { immediate: true });

    const convertedAmount = computed(() => {
        if (rate.value == null) return null;
        const amount = Number(baseAmountRef.value) || 0;
        return amount * rate.value;
    });

    onBeforeUnmount(() => {
        if (abortController) abortController.abort();
        clearAutoRefresh();
    });

    if (autoRefreshMs) startAutoRefresh();

    return {
        rate,
        convertedAmount,
        isLoading,
        error,
        refresh,
    };
}
