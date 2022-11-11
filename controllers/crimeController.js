const CrimeData = require('../models/crimeDataModel');

async function showLatestAverage (req, res) {
    try {
        const name = req.params.borough
        const crime_data = await CrimeData.getCrimeByBorough(name)
        res.status(200).json(crime_data); 
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
}; 


module.exports = {
    showLatestAverage
};
