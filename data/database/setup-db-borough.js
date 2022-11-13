const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const db = require('./db');

async function addBoroughs () {
    try {
        const sql = fs.readFileSync('data/database/setup-borough.sql').toString();

        await db.query(sql)
        console.log("Setup complete.")
        // borough_data.csv has borough_name, second language spoken, motto 
        fs.readFile(`data/data-cleaning/converted_data/borough_data.csv`, (err, data) => {
            parse(data, {columns:false, trim:true}, async (err, rows) => {
                rowData = rows.slice(1)

                for (const [i, row] of rows.slice(1).entries()) {
                    console.log("borough row:", i)

                    await db.query("INSERT INTO borough (borough_name, second_lang, motto) VALUES ($1, $2, $3)", [row[0], row[1], row[2]])
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

addBoroughs()
