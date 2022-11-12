const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();
// const argv = require('minimist')(process.argv.slice(2))

// console.log(argv)

const sql = fs.readFileSync('data/database/setup-rent.sql').toString();
const db = require('./db');

db.query(sql)
    .then(data => console.log("Setup complete."))
    .catch(error => console.log(error));

const rentalData = fs.readFile('data/data-cleaning/converted-data/rental-data.csv', (err, data) => {
    parse(data, {columns: false, trim: true}, async (err, rows) => {
        rowData = rows.slice(1)
        for (row of rowData) {
            // console.log(row)
            // console.log(parseInt(row[1]), parseInt(row[2]))
            await db.query("INSERT INTO rental_data (borough_name, period_start_date, period_end_date, property_type, rent_median, rent_mean) VALUES ($1, $2, $3, $4, NULLIF($5, '')::real, NULLIF($6, '')::real)", [row[0], row[3], row[4], row[5], row[2], row[1]])
            // "INSERT INTO entries (title, content, category, user_account) VALUES ($1, $2, $3, $4)
        }
    })
})
