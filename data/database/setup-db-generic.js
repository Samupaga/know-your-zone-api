require('dotenv').config();

const db = require('./db');

addData = require('./add-data')

addData(process.argv[2], db)
