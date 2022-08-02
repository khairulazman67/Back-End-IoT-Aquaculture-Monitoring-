const mqtt = require('mqtt')
const fs = require('fs')
const { Command } = require('commander')
const axios = require('axios');
// const report
const program = new Command()
program
  .option('-p, --protocol <type>', 'connect protocol: mqtt, mqtts, ws, wss. default is mqtt', 'mqtt')
  .parse(process.argv)

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

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

function subData(topic){
  const client = mqtt.connect(connectUrl, OPTIONS)
  client.on('connect', () => {
      console.log(`${program.protocol}: Connected`)
      client.subscribe([topic], () => {
          console.log(`${program.protocol}: Subscribe to topic '${topic}'`)
      })
  })

  client.on('reconnect', (error) => {
      console.log(`Reconnecting(${program.protocol}):`, error)
  })

  client.on('error', (error) => {
      console.log(`Cannot connect(${program.protocol}):`, error)
  })

  // const report = '../routes/reports'

  client.on('message', (topic, payload) => {
      console.log('Received Message:', topic, payload.toString())
      let nilai = 1.4
      let tinggi = 7.908684

      let persen = (nilai*100)/tinggi
      console.log('ini persen',persen)

      // let data = payload.toString()
      // let data= {
      //     sensor_id: "1",
      //     value: payload.toString()
      // }
      var data = JSON.parse(payload)
      console.log('ini data sub bro',data.msg)
      // axios
      // .post(`http://localhost:3000/reports`,data)
      // .then(r => {
      //     console.log(r)
      // }).catch(e => {
      //     console.error(e.response.data.status);
      // })

      // function getData(){
      //     axios.get('http://localhost:3000/reports')
      //     .then(response => {

      //     })
      //     .catch(error => {
      //         console.log(error);
      //     });
      // }
  })
}
subData('/6720/sp')
