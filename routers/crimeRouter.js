const { Router } = require('express');

const crimeController = require('../controllers/crimeController');

const crimeRouter = Router();

crimeRouter.get('/:borough/average/latest', crimeController.showLatestAverage);
crimeRouter.get('/:borough/average/history', crimeController.showAverageHistory)
crimeRouter.post('/:borough', crimeController.showCrimesTypes)

module.exports = crimeRouter; 
