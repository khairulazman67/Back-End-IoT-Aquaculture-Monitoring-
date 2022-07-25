const bcrypt = require('bcrypt');
const {Reports} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async(req, res)=>{
    const id = req.params.id;
    const report = await Reports.findAll({
        where : {
            sensor_id :id
        }
    });

    if(!report){
        return res.status(404).json({
            status:'error',
            message : 'user not found'
        });
    }

    return res.json({
        status:'success',
        data : report
    })
}