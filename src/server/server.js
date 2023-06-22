const express = require('express');
const DataInputBuilder = require('../dataHandler/DataInputBuilder');
const DataWriter = require('../workingWithAJSON/DataWriter');
const DataFetcher = require('../dataHandler/DataFetcher');

const app = express();


const dataHandler = new DataInputBuilder()
    .start()
    .build();

const dataWriter = new DataWriter();

const dataFetcher = new DataFetcher('http://localhost:3000/latest-data', 5000);
dataFetcher.startFetching();


app.get('/latest-data', (req, res) => {
    const latestData = dataHandler.getLatestData();

    if (latestData) {
        res.json(latestData);
    } else {
        res.status(204).end(); // Отправляем статус "No Content" (204)
    }
});

setInterval(() => {
    const latestData = dataHandler.getLatestData();
    dataWriter.writeDataToFile(latestData);
}, 5000);

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

