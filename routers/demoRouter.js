const { Router } = require('express');

const demoController = require('../controllers/demoController.js');

const demoRouter = Router(); 

demoRouter.get('/:borough/ethnicity', demoController.showEthnicity); 
demoRouter.get('/:borough/religion', demoController.showReligion);
demoRouter.get('/:borough/wellbeing', demoController.showWellbeing);
demoRouter.get('/:borough/age', demoController.showAge);
demoRouter.get('/:borough/sex', demoController.showSex);
demoRouter.get('/:borough/household', demoController.showHousehold);
// demoRouter.get('/:borough/lifesatisfaction', demoController.showLifeSat); 
// demoRouter.get('/:borough/worthwhile', demoController.showWorth);
// demoRouter.get('/:borough/happiness', demoController.showHappiness);
// demoRouter.get('/:borough/anxiety', demoController.showAnxiety);

module.exports = demoRouter;
