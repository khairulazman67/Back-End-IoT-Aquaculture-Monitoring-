var express = require('express');
const { route } = require('.');
var router = express.Router();

const refreshTokenHendler = require('./handler/refreshTokens');

router.post('/', refreshTokenHendler.create);
router.post('/refresh',refreshTokenHendler.refresh);
router.get('/', refreshTokenHendler.getToken);

module.exports = router;
