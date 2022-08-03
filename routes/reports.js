var express = require('express');
var router = express.Router();

const reportsHandler = require('./handler/reports');

router.post('/', reportsHandler.create);
router.get('/feedcap/:pool_id', reportsHandler.feedcap);
router.get('/lastph/:pool_id', reportsHandler.getLastPH);
router.get('/lasttemp/:pool_id', reportsHandler.getLastTemp);
router.get('/lastturbidity/:pool_id', reportsHandler.getLastTurbidity);
router.get('/:id',reportsHandler.report.getReport);

module.exports = router;