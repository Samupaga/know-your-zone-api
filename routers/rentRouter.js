const { Router } = require('express'); 

const rentController = require('../controllers/rentController');

const rentRouter = Router();

rentRouter.get('/london', rentController.showLondon);
rentRouter.get('/:borough', rentController.show);
rentRouter.get('/:borough/accommodation', rentController.showAccom)

module.exports = rentRouter;
