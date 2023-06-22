const axios = require('axios');

class DataFetcher {
    constructor(url, interval) {
        this.url = url;
        this.interval = interval;
        this.firstRequestCompleted = false; // Флаг для отслеживания завершения первого запроса
    }

    startFetching() {
        // Запуск первого запроса с небольшой задержкой
        setTimeout(() => {
            this.fetchData();
        }, 5100);
    }

    async fetchData() {
        try {
            const response = await axios.get(this.url);
            console.log(response.data);
            // Обработка полученных данных

            // Помечаем первый запрос как завершенный
            this.firstRequestCompleted = true;
        } catch (error) {
            console.log(error);
            // Обработка ошибки
        }

        // Вызов функции снова через указанный интервал времени, но только если первый запрос завершен
        if (this.firstRequestCompleted) {
            setTimeout(() => {
                this.fetchData();
            }, this.interval);
        } else {
            // Если первый запрос еще не завершен, повторный запрос будет выполнен через небольшой интервал времени
            setTimeout(() => {
                this.fetchData();
            }, 5100);
        }
    }
}

module.exports = DataFetcher;
