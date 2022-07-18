const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async(req, res)=>{
    const id = req.params.id;
    const user = await User.findByPk(id,{
        attributes : ['id','name','email','avatar']
    });
    if(!user){
        return res.status(404).json({
            status:'error',
            message : 'user not found'
        });
    }

    return res.json({
        status:'success',
        data : user
    })
}