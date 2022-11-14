require('dotenv').config();

const db = require('./db');

addData = require('./add-data')

Promise.all([addData('rent', db), addData('crime', db), addData('ethnicity', db), addData('wellbeing', db), addData('religion', db), addData('age', db), addData('sex', db)])
