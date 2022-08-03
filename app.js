require('dotenv').config();
// require('./mqtt/pub');
require('./mqtt/sub');

const port = process.env.PORT || 8000;

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const refreshTokensRouter = require('./routes/refreshTokens');
const limitsRouter = require('./routes/limits');
const feedingTimesRoutes = require('./routes/feedingTimes');
const reportsRouter = require('./routes/reports');
// const messageRouter = require('./routes/sendMessage');

const cors = require('cors')
//middleware check token
// const verifyToken =  require('./middlewares/verifyToken');

const app = express();


const {
    phoneNumberFormatter
} = require('./helpers/phoneformatter');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh_tokens', refreshTokensRouter);
app.use('/limits', limitsRouter );
app.use('/feeding_times',feedingTimesRoutes);
app.use('/reports',reportsRouter);
// app.use('/send-message',messageRouter);

app.use(fileUpload({
    debug: false
}));


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(fileUpload({
    debug: false
}));

const qrcode = require('qrcode');
const {
    Client,
    MessageMedia,
    LocalAuth
} = require('whatsapp-web.js');
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);

const Validator = require('fastest-validator');
const v = new Validator();

app.get('/sad', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

const client = new Client({
    restartOnAuthFail: true,
    puppeteer:{
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ],
    },
    authStrategy: new LocalAuth()
});

client.initialize();

// Socket IO
io.on('connection', function (socket) {
    socket.emit('message', 'Connecting...');

    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QR Code received, scan please!');
        });
    });

    client.on('ready', () => {
        socket.emit('ready', 'Whatsapp is ready!');
        socket.emit('message', 'Whatsapp is ready!');
    });

    client.on('authenticated', () => {
        socket.emit('authenticated', 'Whatsapp is authenticated!');
        socket.emit('message', 'Whatsapp is authenticated!');
        console.log('AUTHENTICATED');
    });

    client.on('auth_failure', function (session) {
        socket.emit('message', 'Auth failure, restarting...');
    });

    client.on('disconnected', (reason) => {
        socket.emit('message', 'Whatsapp is disconnected!');
        client.destroy();
        client.initialize();
    });
});


const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}

app.post('/sendbro', async(req, res)=>{
    const schema = {
        number: 'string|empty:false',
        message: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;


    const isRegisteredNumber = await checkRegisteredNumber(number);
    // return res.status(200).json({
    //     status: false,
    //     response: number
    // });
    if (!isRegisteredNumber) {
        return res.status(422).json({
            status: false,
            message: 'The number is not registered'
        });
    }

    client.sendMessage(number, message).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });
});

// module.exports = app;
server.listen(port, function () {
    console.log('App running on *: ' + port);
});
