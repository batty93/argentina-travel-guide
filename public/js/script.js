// Lightweight fetch example used on the static index page.
// Do NOT embed secret API keys in frontend code. Use a server-side
// proxy (for example /api/rates) to keep keys private.

const outputElement = document.getElementById('output');
if (!outputElement) {
    // No output element on this page; nothing to do.
    console.debug('No #output element found; skipping sample fetch.');
} else {
    // Call the local proxy endpoint if available. Falls back to a harmless
    // placeholder path to avoid leaking requests to external hosts.
    const apiUrl = '/api/rates';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            outputElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching rates:', error);
            outputElement.textContent = `Error: ${error.message}`;
        });
}
