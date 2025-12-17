import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure dotenv loads the .env file located in the project subfolder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FREECURRENCYAPI_KEY || process.env.VITE_FREECURRENCYAPI_KEY;

if (!API_KEY) {
    console.warn('Warning: No FREECURRENCYAPI_KEY or VITE_FREECURRENCYAPI_KEY found in environment.');
}

app.use(express.json());

// Simple CORS for development. In production, restrict origins.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/latest', async (req, res) => {
    const currencies = req.query.currencies || 'EUR,USD,CAD';
    const base = req.query.base || 'USD';
    const apikey = API_KEY;
    if (!apikey) return res.status(500).json({ error: 'API key not configured on server.' });

    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${encodeURIComponent(apikey)}&base_currency=${encodeURIComponent(base)}&currencies=${encodeURIComponent(currencies)}`;

    try {
        const r = await fetch(url);
        const data = await r.json();
        res.status(r.status).json(data);
    } catch (err) {
        console.error('Proxy error:', err);
        res.status(502).json({ error: 'Failed to fetch from currency API' });
    }
});

app.listen(PORT, () => {
    console.log(`Currency proxy server listening on http://localhost:${PORT}`);
});
