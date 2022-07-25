var express = require('express');
var router = express.Router();

const reportsHandler = require('./handler/reports');
// const verifyToken =  require('../middlewares/verifyToken');

router.post('/', reportsHandler.create);
router.get('/:id',reportsHandler.getReport);
module.exports = router;
