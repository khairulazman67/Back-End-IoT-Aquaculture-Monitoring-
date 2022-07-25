const bcrypt = require('bcrypt');
const {
    Limits,
    Sensors
} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {

    const schema = {
        min_limit: 'string|empty:false|optional',
        max_limit: 'string|empty:false|optional',
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    const id = req.params.id;


    const limits = await Limits.findByPk(id);
    if (!limits) {
        return res.status(404).json({
            status: 'error',
            message: 'times not found'
        });
    }
    const {
        sensor_id,
        min_limit,
        max_limit
    } = req.body;

    await limits.update({
        sensor_id,
        min_limit,
        max_limit
    });

    const data = await Limits.findByPk(id);
    const sensor = await Sensors.findByPk(id);
    // const sensor = await Sensors.findOne({
    //     where: { id: 1 }
    // });
    return res.json({
        status: 'success',
        data: {
            data,
            sensor
        }
    });
}