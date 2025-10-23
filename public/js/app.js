const app = Vue.createApp({
    data() {
        return {
            // 1. Reactive data properties to hold API results
            latestConversion: null,
            latestRates: null,
            latestRatesAsync: null,
            fetchError: null,
        }
    },
    // The mounted hook is where you perform data fetching, 
    // as the component is ready.
    async mounted() {
        // Update the year display
        document.getElementById('year').textContent = new Date().getFullYear();

        // ----------------------------------------------------
        // --- SECURE API KEY RETRIEVAL (SERVER-SIDE ONLY) ----
        // ----------------------------------------------------
        // IMPORTANT: The process.env approach ONLY works in a Node.js/
        // backend environment (like with a build tool or server).
        // If this is frontend (browser) code, you MUST use a backend
        // proxy to keep the key safe. For this example, we'll
        // assume the key is HARDCODED for demonstration *only*.

        const API_KEY = import.meta.env.VITE_CURRENCY_FREAKS_API_KEY;

        // ----------------------------------------------------
        // --- FETCH 1: Conversion (usd -> pkr) ---
        // ----------------------------------------------------
        try {
            const conversionUrl = `https://api.currencyfreaks.com/v2.0/convert/latest?from=usd&to=pkr&amount=500&apikey=${API_KEY}`;
            const response = await fetch(conversionUrl, { method: 'GET', redirect: 'follow' });

            if (!response.ok) {
                throw new Error(`Conversion API HTTP error! Status: ${response.status}`);
            }

            // Note: Use .json() to get a usable object, not .text()
            const result = await response.json();
            this.latestConversion = result;
            console.log("Conversion Result:", result);

        } catch (error) {
            this.fetchError = error.message;
            console.error('Conversion Fetch error:', error);
        }

        // ----------------------------------------------------
        // --- FETCH 2: Latest Rates (gbp base) ---
        // ----------------------------------------------------
        try {
            const ratesUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?base=gbp&symbols=pkr,usd,cad,eur&apikey=${API_KEY}`;
            const response = await fetch(ratesUrl, { method: 'GET', redirect: 'follow' });

            if (!response.ok) {
                throw new Error(`Rates API HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            this.latestRates = result;
            console.log("Rates Result:", result);

        } catch (error) {
            this.fetchError = error.message;
            console.error('Rates Fetch error:', error);
        }

        // ----------------------------------------------------
        // --- FETCH 3: Your Async Function Logic ---
        // ----------------------------------------------------
        // This block mirrors the logic in your original getCurrencyRates function
        const baseCurrency = 'USD';
        const targetCurrencies = 'EUR,GBP,ARG';
        const asyncUrl = `https://api.currencyfreaks.com/latest?apikey=${API_KEY}&symbols=${targetCurrencies}&base=${baseCurrency}`;

        try {
            const response = await fetch(asyncUrl);

            if (!response.ok) {
                throw new Error(`Async Rates HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`API Error: ${data.error.message}`);
            }

            this.latestRatesAsync = data;
            console.log("Async Base Currency:", data.base);
            console.log("Async Rates:", data.rates);

        } catch (error) {
            this.fetchError = error.message;
            console.error('Async Fetch error:', error);
        }
    }
});

app.mount('#app');