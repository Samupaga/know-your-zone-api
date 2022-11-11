const { Router } = require('express');

const summaryController = require('../controllers/summaryController.js')

const summaryRouter = Router()

summaryRouter.get('/:borough', summaryController.show)

module.exports = summaryRouter;
