var express = require('express');
var router = express.Router();

const limitsHandler = require('./handler/limits');
// const verifyToken =  require('../middlewares/verifyToken');

router.get('/', limitsHandler.getLimits);
router.put('/:id', limitsHandler.update);
module.exports = router;
