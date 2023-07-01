const express = require('express');
const path = require('path');
const DataInputBuilder = require('../dataHandler/DataInputBuilder');
const DataWriter = require('../workingWithAJSON/DataWriter');
const DataFetcher = require('../dataHandler/DataFetcher');
const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:3000/api/data?mode=history')
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

app.get('/api/data', async (req, res) => {
    try {
        const { mode } = req.query;
        let data;

        if (mode === 'latest') {
            data = await dataHandler.getLatestData();
        } else if (mode === 'history') {
            data = await dataHandler.getHistoryData();
        }

        if (data) {
            res.json(data);
        } else {
            res.status(204).end(); // Отправляем статус "No Content" (204)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/data', async (req, res) => {
    try {
        const { mode } = req.query;
        let historyData = [];
        let latestData = {};

        if (mode === 'latest') {
            latestData = await dataHandler.getLatestData();
        } else if (mode === 'history') {
            historyData = await dataHandler.getHistoryData();
        }

        if (latestData || historyData.length > 0) {
            if (latestData)
                res.json(latestData);
            else if (historyData.length > 0)
                res.json(historyData);
        } else {
            res.status(204).end(); // Отправляем статус "No Content" (204)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
