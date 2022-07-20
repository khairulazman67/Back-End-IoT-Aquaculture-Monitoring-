// const bcrypt = require('bcrypt');
const {Limits} = require('../../../models');
// const Validator = require('fastest-validator');
// const v = new Validator();

module.exports = async(req, res)=>{

    const limits = await Limits.findAll();
    if(!limits){
        return res.status(404).json({
            status : 'error',
            message : 'limits not found'
        });
    }

    return res.json({
        status:'success',
        data : limits
    })
}