// const bcrypt = require('bcrypt');
const {Limits,Sensors,Reports} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async(req, res)=>{
    const schema = {
        sensor_id: 'string|empty:false',
        value: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    
    const sensor = await Sensors.findOne({
        where: {
            id: req.body.sensor_id
        }
    });

    if (!sensor) {
        return res.status(404).json({
            status: 'error',
            message: 'sensor not found'
        });
    }

    const data = {
        sensor_id : req.body.sensor_id,
        value : req.body.value,
    }
    const creaReports = await Reports.create(data);

    return res.json({
        status : 'success',
        data : {
            data : creaReports
        }
    })
}