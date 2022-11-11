const { Router } = require('express');

const crimeController = require('../controllers/crimeController');

const crimeRouter = Router();

crimeRouter.get('/:borough', crimeController.show); 

module.exports = crimeRouter; 
