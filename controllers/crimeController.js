const CrimeData = require('../models/crimeModel');

async function showLatestAverage (req, res) {
    try {
        const name = req.params.borough
        const crime_data = await CrimeData.getCrimeByBorough(name)
        console.log(crime_data)
        res.status(200).json(crime_data); 
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
};

async function showCrimesTypes (req, res) {
    try {
        const name = req.params.borough
        const data = await CrimeData.getCrimeByTypes(name, req.body.crimeTypes)
        res.status(200).json(data); 
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
};

module.exports = {
    showLatestAverage,
    showCrimesTypes
};
