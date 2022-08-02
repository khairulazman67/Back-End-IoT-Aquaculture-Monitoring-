const {Reports} = require('../../../models');

module.exports = async(req, res)=>{

    const feed = await Reports.findOne({
        where: {
            sensor_id: 1
        }
    }
    );
    if(!feed){
        return res.status(404).json({
            status : 'error',
            message : 'Feed Cap not found'
        });
    }
    return res.json({
        status:'success',
        data : feed
    })
}