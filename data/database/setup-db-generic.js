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
        const boroughs = {}
        boroughData.rows.forEach(borough => boroughs[borough.borough_name] = borough.id)
        
        fs.readFile(`data/data-cleaning/converted_data/${dataCategory}_data.csv`, (err, data) => {
            parse(data, {columns:false, trim:true}, async (err, rows) => {
                rowData = rows.slice(1)
                for (row of rows.slice(1)) {
                    const boroughId = boroughs[row[0]]
                    if (dataCategory === "ethnicity") {
                        await db.query("INSERT INTO ethnicity_data (borough_id, white, asian, black, other, total_population) VALUES ($1, $2, $3, $4, $5, $6)", [boroughId
                            , row[1], row[2], row[3], row[4], row[5]])
                    } else if (dataCategory === 'religion') {
                        await db.query("INSERT INTO religion_data (borough_id, christian, buddhist, hindu, jewish, muslim, sikh, other_religion, no_religion, total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [boroughId, row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]])
                    }
                }
            })
        })
    } catch (err) {
        console.error(err)
    }
}

addData(process.argv[2])
