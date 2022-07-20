const bcrypt = require('bcrypt');
const {
    Limits
} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {

    const schema = {
        sensor_name: 'string|empty:false|optional',
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
        sensor_name,
        min_limit,
        max_limit
    } = req.body;

    await limits.update({
        sensor_name,
        min_limit,
        max_limit
    });

    const data = await Limits.findByPk(id);
    return res.json({
        status: 'success',
        data: {
            data
        }
    });
}