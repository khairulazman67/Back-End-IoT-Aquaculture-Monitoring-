var express = require('express');
var router = express.Router();

const feedingTimesHandler = require('./handler/feedingTimes');
// const verifyToken =  require('../middlewares/verifyToken');

router.get('/', feedingTimesHandler.feeding_times);
router.put('/:id', feedingTimesHandler.update);
module.exports = router;
