#!/usr/bin/env bash
# Simple smoke test for /api/rates
# Usage: CURRENCY_FREAKS_API_KEY=key bash scripts/check-rates.sh

set -euo pipefail

PORT=${PORT:-8080}
URL="http://localhost:${PORT}/api/rates"

if [ -z "${CURRENCY_FREAKS_API_KEY:-}" ]; then
  echo "CURRENCY_FREAKS_API_KEY is not set. Please set it in the environment or export it before running this script." >&2
  exit 2
fi

response=$(curl -sS -H "Accept: application/json" "$URL" || true)

if [ -z "$response" ]; then
  echo "Empty response from $URL" >&2
  exit 2
fi

# Basic validation: must start with { or [
first_char=$(echo "$response" | tr -d '\n' | cut -c1)
if [[ "$first_char" != '{' && "$first_char" != '[' ]]; then
  echo "Unexpected response start: $first_char" >&2
  echo "$response" >&2
  exit 2
fi

echo "OK: /api/rates responded with JSON (length=$(echo -n "$response" | wc -c))"
exit 0
