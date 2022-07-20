require('dotenv').config();
require('./mqtt/pub');
require('./mqtt/sub');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const refreshTokensRouter = require('./routes/refreshTokens');
const limitsRouter = require('./routes/limits');
const feedingTimesRoutes = require('./routes/feedingTimes');

//middleware check token
// const verifyToken =  require('./middlewares/verifyToken');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh_tokens', refreshTokensRouter);
app.use('/limits', limitsRouter);
app.use('/feeding_times',feedingTimesRoutes);

module.exports = app;
