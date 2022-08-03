const create = require('./create');
const report = require('./getReport');
const feedcap = require('./getFeedCap');
const getLastPH = require('./getLastPH');
const getLastTemp = require('./getLastTemp');
const getLastTurbidity = require('./getLastTurbidity');

module.exports = {
    create,
    feedcap,
    getLastPH,
    getLastTemp,
    getLastTurbidity,

    report
}