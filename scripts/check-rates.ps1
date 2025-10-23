# PowerShell smoke test for /api/rates
# Usage: $env:CURRENCY_FREAKS_API_KEY = 'key'; .\scripts\check-rates.ps1

param()

$port = $env:PORT -or 8080
$url = "http://localhost:$port/api/rates"

if (-not $env:CURRENCY_FREAKS_API_KEY) {
    Write-Error 'CURRENCY_FREAKS_API_KEY is not set. Please set it before running this script.'
    exit 2
}

try {
    $resp = Invoke-RestMethod -Uri $url -Headers @{ Accept = 'application/json' } -ErrorAction Stop
    Write-Output "OK: /api/rates returned JSON with keys: $($resp | Get-Member -MemberType NoteProperty | Select-Object -ExpandProperty Name -First 10 -Join ', ')"
    exit 0
} catch {
    Write-Error "Request failed: $($_.Exception.Message)"
    exit 2
}
