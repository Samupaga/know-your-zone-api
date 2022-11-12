const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const sql = fs.readFileSync('data/database/setup-crime.sql').toString();
const db = require('./db');

db.query(sql)
    .then(data => console.log("Setup complete."))
    .catch(error => console.log(error));

const crimeData = fs.readFile('data/data-cleaning/converted-data/crime-data.csv', (err, data) => {
    parse(data, {columns: false, trim: true}, async (err, rows) => {
        rowData = rows.slice(1)
        for (row of rowData) {
            console.log(row)
            await db.query("INSERT INTO crime_data (borough_name, period, offence_category, offence_count) VALUES ($1, $2, $3, $4)", [row[1], row[2], row[0], row[3]])
        }
    })
})
