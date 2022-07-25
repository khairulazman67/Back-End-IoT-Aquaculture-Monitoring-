var express = require('express');
var router = express.Router();
const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');

const qrcode = require("qrcode-terminal");
const Validator = require('fastest-validator');
const v = new Validator();

const {
    phoneNumberFormatter
} = require('./helpers/phoneformatter');

const {Limits} = require('../models');

// const verifyToken =  require('../middlewares/verifyToken');

const client = new Client({
    restartOnAuthFail: true,
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
    },
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr);
});

client.on("authenticated", () => {
    console.log("AUTHENTICATED");
});

client.on('ready', () => {
    console.log('Client is ready to send wa message!');
});

client.on('auth_failure', function (session) {
    console.log('Auth failure, restarting...');
});

client.on('disconnected', (reason) => {
    client.destroy();
    client.initialize();
});

const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}

router.post('/', async(req, res)=>{
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

module.exports = router;
