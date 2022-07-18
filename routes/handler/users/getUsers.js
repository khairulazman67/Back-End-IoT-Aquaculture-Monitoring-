const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async(req, res)=>{
    const userIds = req.query.user_ids || [];
    const sqlOptions ={
        attributes : ['id','name','email','avatar']
    }
    if(userIds.length){
        sqlOptions.where={
            id:userIds
        }
    }

    const users = await User.findAll(sqlOptions);

    return res.json({
        status:'success',
        data : users
    })
}