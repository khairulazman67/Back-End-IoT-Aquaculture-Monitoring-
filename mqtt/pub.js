const mqtt = require('mqtt')
const fs = require('fs')
const { Command } = require('commander')

const program = new Command()
program
    .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
    .parse(process.argv)

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

// connect options
const OPTIONS = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
}
// protocol list
const PROTOCOLS = ['mqtt', 'mqtts', 'ws', 'wss']

// default is mqtt, unencrypted tcp connection
let connectUrl = `mqtt://${host}:${port}`
if (program.protocol && PROTOCOLS.indexOf(program.protocol) === -1) {
    console.log('protocol must one of mqtt, mqtts, ws, wss.')
} else if (program.protocol === 'mqtts') {
    // mqtts， encrypted tcp connection
    connectUrl = `mqtts://${host}:8883`
    OPTIONS['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
} else if (program.protocol === 'ws') {
    // ws, unencrypted WebSocket connection
    const mountPath = '/mqtt' // mount path, connect emqx via WebSocket
    connectUrl = `ws://${host}:8083${mountPath}`
} else if (program.protocol === 'wss') {
    // wss, encrypted WebSocket connection
    const mountPath = '/mqtt' // mount path, connect emqx via WebSocket
    connectUrl = `wss://${host}:8084${mountPath}`
    OPTIONS['ca'] = fs.readFileSync('./broker.emqx.io-ca.crt')
} else {}

// const topic = '/6720'
const client = mqtt.connect(connectUrl, OPTIONS)

function pubData(topic){
    const axios = require('axios');
    client.on('connect', async () => {
    console.log(`${program.protocol}: Connected`)
    function pub(param,topic){
            client.publish(topic, param, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        }
        function getData(){
            axios.get('http://localhost:3000/feeding_times/')
            .then(response => {
                var pH_min_limits = response.data.data[0]? response.data.data[0].time: 0
                pub(pH_min_limits.toString(),'/6720')
            })
            .catch(error => {
                console.log(error);
            });
        }
        getData()
    })

    client.on('reconnect', (error) => {
        console.log(`Reconnecting(${program.protocol}):`, error)
    })

    client.on('error', (error) => {
        console.log(`Cannot connect(${program.protocol}):`, error)
    })

    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })
}
pubData('/6720/sp')