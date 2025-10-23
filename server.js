"use strict";

const express = require("express");
const app = express();
const port = 8080;

app.use(express.static("./public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});



const apiKey = 'ef09a2977e954f2786bdcc657c7995a4';
const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=ef09a2977e954f2786bdcc657c7995a4`;

const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
    },
};

fetch(apiUrl, requestOptions)
    .then(response => {
        if !response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        outputElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
    });