const port = process.env.PORT || 8000;
const {
    Client,
    MessageMedia,
    LocalAuth
} = require('whatsapp-web.js');
const express = require('express');


const qrcode = require('qrcode');


const fs = require('fs');

const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');


const app = express();

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(fileUpload({
    debug: false
}));

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
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

server.listen(port, function () {
    console.log('App running on *: ' + port);
});