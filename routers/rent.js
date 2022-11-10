const { Router } = require.('express'); 

const rentController = require('../controllers/rent');

const rentRouter = Router();

rentRouter.get('/:borough', rentController.show);



module.exports = userRouter;
