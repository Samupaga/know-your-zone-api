const fs = require('fs');
require('dotenv').config();

const db = require('./db');

async function deleteTables () {
    try {
        const sql = fs.readFileSync('data/database/delete-all-tables.sql').toString();

        await db.query(sql)
        console.log("Setup complete.")
    } catch (err) {
        console.error(err)
    }
}

deleteTables()
