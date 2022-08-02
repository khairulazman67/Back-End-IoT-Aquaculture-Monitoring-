var express = require('express');
var router = express.Router();

const reportsHandler = require('./handler/reports');

router.post('/', reportsHandler.create);
router.get('/:id',reportsHandler.report.getReport);

module.exports = router;
