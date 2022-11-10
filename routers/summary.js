const { Router } = require('express');

const boroughController = require('../controllers/summary.js')

const summaryRouter = Router()

summaryRouter.get('/borough', boroughController.show)

module.exports = summaryRouter;
