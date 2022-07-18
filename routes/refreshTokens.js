var express = require('express');
var router = express.Router();

const refreshTokenHendler = require('./handler/refreshTokens');

router.post('/', refreshTokenHendler.create);
router.get('/', refreshTokenHendler.getToken);

module.exports = router;
