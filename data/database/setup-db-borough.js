const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const sql = fs.readFileSync('data/database/setup-borough.sql').toString();
const db = require('./db');

db.query(sql)
    .then(data => console.log("Setup complete."))
    .catch(error => console.log(error));

const boroughNames = fs.readFile('data/data-cleaning/converted_data/borough_names.csv', (err, data) => {
    parse(data, {columns: false, trim: true}, async (err, rows) => {
        rowData = rows.slice(1)
        for (row of rowData) {
            // console.log(row)
            await db.query("INSERT INTO borough (borough_name) VALUES ($1)", [row[0]])
        }
    })
})
