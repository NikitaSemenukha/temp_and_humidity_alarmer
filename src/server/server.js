const express = require('express');
const path = require('path');
const DataInputBuilder = require('../dataHandler/DataInputBuilder');
const DataWriter = require('../workingWithAJSON/DataWriter');
const DataFetcher = require('../dataHandler/DataFetcher');
const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:3000/history-data')
        .then(response => {
            const historyData = response.data;
            console.log('Received history data:');
            console.log(historyData);
        })
        .catch(error => {
            console.error('Error occurred while fetching history data:', error);
        });
}, 5000);

const app = express();

const dataHandler = new DataInputBuilder()
    .start()
    .build();

const dataWriter = new DataWriter();

// const dataFetcher = new DataFetcher('http://localhost:3000/latest-data', 5000);
// dataFetcher.startFetching();

app.get('/latest-data', (req, res) => {
    const latestData = dataHandler.getLatestData();

    if (latestData) {
        res.json(latestData);
    } else {
        res.status(204).end(); // Отправляем статус "No Content" (204)
    }
});

app.get('/history-data', (req, res) => {
    const historyData = dataHandler.getHistoryData();

    if (historyData.length > 0) {
        res.json(historyData);
    } else {
        res.status(204).end(); // Отправляем статус "No Content" (204)
    }
});

app.get('/charts', (req, res) => {
    const filePath = path.join(__dirname, '..', 'app', 'index.html'); // Путь к файлу index.html
    res.sendFile(filePath);
});


setInterval(() => {
    const latestData = dataHandler.getLatestData();
    dataWriter.writeDataToFile(latestData);
}, 5000);

// app.use(express.static(path.join(__dirname, 'app')));

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
