var express = require('express');
var router = express.Router();

const reportsHandler = require('./handler/reports');

router.post('/', reportsHandler.create);
router.get('/feedcap', reportsHandler.feedcap);
router.get('/:id',reportsHandler.report.getReport);

module.exports = router;