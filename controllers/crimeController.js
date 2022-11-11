const CrimeData = require('../models/crimeDataModel');

async function show (req, res) {
    try {
        const name = req.params.borough_name
        const borough = await CrimeData.getCrimeByBorough(name)
        res.status(200).json(borough); 
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
}; 


module.exports = {
    show
};
