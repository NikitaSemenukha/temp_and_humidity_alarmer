const fs = require('fs');

let dataArray = []; // Array to store all the data

function writeDataToFile(data) {
    dataArray.push(data); // Add the data to the array

    const jsonData = JSON.stringify(dataArray, null, 2);
    const formattedData = jsonData.replace(/\}\,/g, '},\n');

    fs.writeFile('data.json', formattedData, (err) => {
        if (err) {
            console.error('Ошибка при записи данных в файл:', err);
        } else {
            console.log('Данные успешно записаны в файл data.json');
        }
    });
}

module.exports = {
    writeDataToFile: writeDataToFile
};
