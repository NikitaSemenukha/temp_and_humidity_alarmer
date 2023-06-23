const generateNumber1 = require('../files/file1');
const generateNumber2 = require('../files/file2');

class DataInputBuilder {
    constructor() {
        this.data = [];
        this.intervalId = null;
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                const temperature = generateNumber1();
                const humidity = generateNumber2();

                let temperatureStatus;
                if (temperature > 50) {
                    temperatureStatus = "critical";
                } else if (temperature >= 35 && temperature <= 50) {
                    temperatureStatus = "pre-critical";
                } else {
                    temperatureStatus = "normal";
                }

                let humidityStatus;
                if (humidity > 70) {
                    humidityStatus = "high";
                } else if (humidity >= 40 && humidity <= 70) {
                    humidityStatus = "moderate";
                } else {
                    humidityStatus = "low";
                }

                const newData = {
                    temperature: temperature,
                    humidity: humidity,
                    temperatureStatus: temperatureStatus,
                    humidityStatus: humidityStatus,
                    createdAt: new Date()
                };

                this.data.push(newData);
            }, 5000);
        }
        return this;
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        return this;
    }

    getLatestData() {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        }
        return {};
    }

    getHistoryData() {
        return this.data;
    }

    reset() {
        this.data = [];
        return this;
    }

    build() {
        return {
            getLatestData: this.getLatestData.bind(this),
            getHistoryData: this.getHistoryData.bind(this),
            start: this.start.bind(this),
            stop: this.stop.bind(this),
            reset: this.reset.bind(this)
        };
    }
}

module.exports = DataInputBuilder;
