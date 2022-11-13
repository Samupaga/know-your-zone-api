const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const db = require('./db');

async function addBoroughs () {
    try {
        const sql = fs.readFileSync('data/database/setup-borough.sql').toString();

        await db.query(sql)
        console.log("Setup complete.")

        fs.readFile(`data/data-cleaning/converted_data/borough_names.csv`, (err, data) => {
            parse(data, {columns:false, trim:true}, async (err, rows) => {
                rowData = rows.slice(1)

                for (const [i, row] of rows.slice(1).entries()) {
                    console.log("borough row:", i)

                    await db.query("INSERT INTO borough (borough_name) VALUES ($1)", [row[0]])
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

addBoroughs()
