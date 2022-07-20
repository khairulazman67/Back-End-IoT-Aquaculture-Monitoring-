const bcrypt = require('bcrypt');
const {
    FeedingTimes
} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {

    const schema = {
        name: 'string|empty:false|optional',
        time: 'string|empty:false|optional',
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    const id = req.params.id;

    const feeding_times = await FeedingTimes.findByPk(id);
    if (!feeding_times) {
        return res.status(404).json({
            status: 'error',
            message: 'times not found'
        });
    }
    const {
        name,
        time,
    } = req.body;

    await feeding_times.update({
        name,
        time,
    });

    const data = await FeedingTimes.findByPk(id);
    return res.json({
        status: 'success',
        data: {
            data
        }
    });
}