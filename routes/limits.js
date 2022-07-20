var express = require('express');
var router = express.Router();

const limitsHandler = require('./handler/limits');
// const verifyToken =  require('../middlewares/verifyToken');

router.get('/pH', limitsHandler.pHget);
module.exports = router;
