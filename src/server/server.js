const express = require('express');
const DataInputBuilder = require('../dataHandler/DataInputBuilder');
const dataWriter = require('../writeToFile/dataWriter');

const app = express();

// Create a DataHandler instance using the builder
const dataHandler = new DataInputBuilder()
    .start() // Start data handling
    .build();

app.get('/latest-data', (req, res) => {
    const latestData = dataHandler.getLatestData();
    res.json(latestData);
});

setInterval(() => {
    const latestData = dataHandler.getLatestData();
    dataWriter.writeDataToFile(latestData);
}, 5000);

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
