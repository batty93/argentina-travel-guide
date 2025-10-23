"use strict";

// Simple Express server for serving static site and providing a small
// proxy endpoint for currency rates. Keeps server code CommonJS so it can
// run with the project's root package.json settings.

// Load .env if dotenv is available. Make this optional to avoid crashing
// when dotenv isn't installed (useful in constrained environments).
try {
    require('dotenv').config();
} catch (err) {
    // Not fatal — environment variables can be provided by the host instead.
    console.debug('dotenv not installed; skipping .env load. Set env vars externally if needed.');
}
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET /api/rates
// Proxy to CurrencyFreaks latest rates using API key from environment.
// Query params supported:
//  - base (optional) e.g. ?base=USD
//  - symbols (optional) comma-separated list e.g. ?symbols=ARS,EUR
app.get('/api/rates', async (req, res) => {
    const apiKey = process.env.CURRENCY_FREAKS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Missing CURRENCY_FREAKS_API_KEY in environment' });
    }

    const url = new URL('https://api.currencyfreaks.com/v2.0/rates/latest');
    url.searchParams.set('apikey', apiKey);
    if (req.query.base) url.searchParams.set('base', req.query.base);
    if (req.query.symbols) url.searchParams.set('symbols', req.query.symbols);

    try {
        if (typeof fetch !== 'function') {
            // Node >=18 has global fetch. If it's not available, provide a helpful error.
            throw new Error('Global fetch is not available in this Node runtime. Use Node 18+ or install a fetch polyfill.');
        }

        const response = await fetch(url.toString());
        const text = await response.text();

        // Try to parse JSON; if it fails, return raw text for easier debugging.
        try {
            const data = JSON.parse(text);
            if (!response.ok) return res.status(response.status).json(data);
            return res.json(data);
        } catch (parseErr) {
            if (!response.ok) return res.status(response.status).send(text);
            res.type('text').send(text);
        }
    } catch (err) {
        console.error('Error fetching currency rates:', err);
        res.status(502).json({ error: 'Failed to fetch currency rates', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log('Press Ctrl+C to end this process.');
});