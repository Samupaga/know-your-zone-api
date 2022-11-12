const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const sql = fs.readFileSync('data/database/setup-religion.sql').toString();
const db = require('./db');

db.query(sql)
    .then(data => console.log("Setup complete."))
    .catch(error => console.log(error));

const religionData = fs.readFile('data/data-cleaning/converted_data/religion_data.csv', (err, data) => {
    parse(data, {columns: false, trim: true}, async (err, rows) => {
        rowData = rows.slice(1)
        for (row of rowData) {
            // console.log(row)
            await db.query("INSERT INTO religion_data (borough_name, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]])
        }
    })
})
