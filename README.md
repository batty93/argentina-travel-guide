# Argentina Travel Guide

Small static site with an Express server used for static file serving and a tiny proxy endpoint for currency rates.

## Overview
- Root `server.js` provides static file serving from `./public` and a proxy endpoint `GET /api/rates` which fetches latest rates from CurrencyFreaks.
- Front-end assets live in `public/` (vanilla HTML/JS) and there is also a Vite-based front-end in the `argentina-travel-guide/` subfolder (Vue + Vite).

## Environment variables
The server expects the following environment variables when using the proxy endpoint:

- `CURRENCY_FREAKS_API_KEY` (required for `/api/rates`): your CurrencyFreaks API key. If this is not set, `GET /api/rates` will return a 500.
- `PORT` (optional): port for the Express server. Defaults to `8080`.

You can provide them in one of these ways:

1. Set env vars in your shell before running the server (recommended):

   PowerShell (Windows):
   ```powershell
   $env:CURRENCY_FREAKS_API_KEY = "your_api_key_here"
   $env:PORT = "8080"
   node server.js
   ```

   Bash (Linux/macOS/Git Bash):
   ```bash
   export CURRENCY_FREAKS_API_KEY=your_api_key_here
   export PORT=8080
   node server.js
   ```

2. Use a `.env` file (local development) and install `dotenv`:

   - Create a `.env` in the project root:
     ```env
    # Argentina Travel Guide

    Lightweight static site served by an Express server. The server provides a small proxy endpoint for currency rates so API keys are not exposed to browsers.

    Author: Elizabeth Batz

    ---

    ## Quickstart (concise)

    1. Set the CurrencyFreaks API key in your environment (Bash preferred):

      Bash / macOS / Linux:
      ```bash
      export CURRENCY_FREAKS_API_KEY=your_api_key_here
      export PORT=8080   # optional
      ```

      (PowerShell examples are provided below for Windows users.)

    2. Start the server (from project root):

    ```bash
    node server.js
    ```

    3. Open your browser:

      http://localhost:8080

    ## Development

    Root project (Express server serving `public/`):

    ```bash
    # from project root
    npm install     # installs express and other root deps
    npm start       # runs node server.js (adds a convenient npm script)
    ```

    Vite + Vue frontend (optional)

    ```bash
    cd argentina-travel-guide
    npm install
    npm run dev
    ```

    The Vite dev server typically runs at `http://localhost:5173`.

    ## .env example

    Create a `.env` file in the project root for local development (optional):

    ```env
    CURRENCY_FREAKS_API_KEY=your_api_key_here
    PORT=8080
    ```

    Then install `dotenv` if you want automatic `.env` loading during development:

    ```bash
    npm install dotenv
    ```

    Note: the server will not fail if `dotenv` is missing; it will simply read env vars from the environment.

    ## Security

    - Never commit API keys to the repository or serve them from `public/`.
    - Use `GET /api/rates` (provided by `server.js`) so keys remain on the server.

    ## Smoke-test scripts

    I added a Bash-first smoke-test script to validate `/api/rates`.

    - `scripts/check-rates.sh` (Bash — preferred)
    - `scripts/check-rates.ps1` (PowerShell — optional)

    Usage (make sure `CURRENCY_FREAKS_API_KEY` is set and server is running):

    ```bash
    # Make the script executable if needed
    chmod +x scripts/check-rates.sh
    ./scripts/check-rates.sh
    ```

    PowerShell users can run:

    ```powershell
    $env:CURRENCY_FREAKS_API_KEY = 'your_key'; .\scripts\check-rates.ps1
    ```

    ## Troubleshooting

    - If PowerShell blocks `npm` scripts (error mentioning `npm.ps1`), run npm commands from `cmd.exe` or use `node server.js` directly.
    - If `/api/rates` returns errors, confirm `CURRENCY_FREAKS_API_KEY` is set and valid.

    ## License

    ISC

    ---

    If you'd like, I can:

    - Run `npm install dotenv` for you.
    - Add more GitHub-friendly badges and a project description at the top.
    - Add automated smoke-tests to the project CI.

    Which would you like next?