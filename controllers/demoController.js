const DemoData = require('../models/demoModel')

async function showEthnicity (req, res) {
    try{
        const name = req.params.borough
        const borough = await DemoData.getEthnicityByBorough(name)
        res.status(200).json(borough)
    } catch (err) {
        res.status(404).json({'eroor': err.message})
    }
}; 

async function showReligion (req, res) {
    try {
        const name = req.params.borough
        const borough = await DemoData.getReligionByBorough(name)
        res.status(200).json(borough)
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
};

async function showWellbeing (req, res) {
    try {
        const name = req.params.borough
        const borough = await DemoData.getWellbeingByBorough(name)
        res.status(200).json(borough)
    } catch (err) {
        res.status(404).json({'error': err.message})
    }
};

async function showAge (req, res) {
    try {
        const name = req.params.borough
        const borough = await DemoData.getAgeByBorough(name)
        res.status(200).json(borough)
    } catch (err) {
        res.status(404).json({'error' : err.message})
    }
};

async function showSex (req, res) {
    try {
        const name = req.params.borough
        const borough = await DemoData.getSexByBorough(name)
        res.status(200).json(borough)
    } catch (err) {
        res.status(404).json({'error' : err.message})
    }
};


module.exports = {
    showEthnicity, showReligion, showWellbeing, showAge, showSex
}; 
