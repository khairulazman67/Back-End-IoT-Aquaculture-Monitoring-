const bcrypt = require('bcrypt');
const {Reports, Sensors} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

const index  = {
    getReport : async(req, res)=>{
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

        // const sensor_data = await Sensors.findOne({
        //     where : {
        //         id :id
        //     }
        // });
        return res.json({
            status:'success',
            data : report
        })
    }
}
module.exports = index