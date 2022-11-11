const RentalData = require('../models/rentModel')

// Get info for all London
async function showLondon (req, res) {
    try{
        const response = await RentalData.getAllLondon()
        res.json(response)
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

// Get info for specific borough 
async function show (req, res) {
    try { 
        const name = req.body.borough_name
        const borough = await RentalData.getOneByName(name)
        res.json(borough)
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
}

module.exports = {
    show, showLondon
}
