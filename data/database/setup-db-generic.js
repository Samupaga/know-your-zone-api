const fs = require('fs');
const { parse } = require('csv-parse');
require('dotenv').config();

const db = require('./db'); 

async function addData (dataCategory) {
    try {
        const sql = fs.readFileSync(`data/database/setup-${dataCategory}.sql`).toString();

        await db.query(sql)
        console.log("Setup complete.")

        const boroughData = await db.query("SELECT id, borough_name FROM borough ORDER BY id")
        const boroughNames = {}
        boroughData.rows.forEach(borough => boroughNames[borough.borough_name] = borough.id)
        
        fs.readFile(`data/data-cleaning/converted_data/${dataCategory}_data.csv`, (err, data) => {
            parse(data, {columns:false, trim:true}, async (err, rows) => {
                rowData = rows.slice(1)
                for (row of rows.slice(1)) {
                    if (dataCategory === "ethnicity") {
                        await db.query("INSERT INTO ethnicity_data (borough_id, white, asian, black, other, total_population) VALUES ($1, $2, $3, $4, $5, $6)", [boroughNames[row[0]], row[1], row[2], row[3], row[4], row[5]])
                    }
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

addData(process.argv[2])
