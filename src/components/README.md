# Argentina Travel Guide

This project is a Vue.js application for travelers to Argentina, featuring a currency converter and travel resources.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Configuration

This project uses **ExchangeRate-API** for currency conversion. You need an API key to fetch real-time rates.

1.  **Create the Environment File**:
    Copy the example file to a local `.env` file (which is git-ignored).
    ```sh
    cp .env.example .env
    ```

2.  **Get an API Key**:
    Sign up for a free key at ExchangeRate-API.

3.  **Update `.env`**:
    Open `.env` and set your key:
    ```properties
    VITE_EXCHANGE_RATE_API_KEY=your_actual_api_key_here
    ```

## Utility Scripts

-   **Merge Env**: `node merge-env.js`
    Checks your local `.env` and adds any missing keys to `.env.example` (without copying the values), ensuring the example file stays up to date.

-   **Check Secrets**: `node ../scripts/check-secrets.js`
    Scans the repository for accidental commits of API keys or secrets.