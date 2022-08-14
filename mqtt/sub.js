const mqtt = require('mqtt')
const fs = require('fs')
const { Command } = require('commander')
const axios = require('axios');
// const report

async function main(){
  const BACKEND_SERVICE_URL = "http://localhost:3000"
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
  
    function inputdata(data){
      axios
          .post(`${BACKEND_SERVICE_URL}/reports`,data)
          .then(r => {
              console.log(r)
          }).catch(e => {
              console.error(e.response.data.status);
          })
    }
    client.on('message', (topic, payload) => {
      // console.log('Received Message:', topic, payload.to)
        var data = JSON.parse(payload).msg
        console.log('ini data sub bro',data)
        let nilaidata = null

        if (topic === '/6720/SP'){
          let nilai = data

          let tinggi = 7.908684
          let persen = (nilai*100)/tinggi
          console.log('Ini nilai ',persen)
          nilaidata = {
            sensor_id: "4",
            value: persen.toString(),
            pool : "0"
          }
          inputdata(nilaidata)

        }else if (topic === '/6720/TURB'){
          nilaidata = {
            sensor_id: "1",
            value: data[0].toString(),
            pool : "1"
          },
          nilaidata2= {
            sensor_id: "1",
            value: data[1].toString(),
            pool : "2"
          }
          inputdata(nilaidata)
          inputdata(nilaidata2)
        }else if (topic === '/6720/TEMP'){
          nilaidata = {
            sensor_id: "2",
            value: data[0].toString(),
            pool : "1"
          },
          nilaidata2= {
            sensor_id: "2",
            value: data[1].toString(),
            pool : "2"
          }
          inputdata(nilaidata)
          inputdata(nilaidata2)

        }else if (topic === '/6720/PH'){
          nilaidata = {
            sensor_id: "3",
            value: data[0].toString(),
            pool : "1"
          },
          nilaidata2= {
            sensor_id: "3",
            value: data[1].toString(),
            pool : "2"
          }
          inputdata(nilaidata)
          inputdata(nilaidata2)
        }
    })
  }

  await subData('/6720/SP')
  await subData('/6720/TEMP')
  await subData('/6720/TURB')
  await subData('/6720/PH')
}
main()