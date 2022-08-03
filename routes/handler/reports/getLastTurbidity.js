const {Reports} = require('../../../models');

module.exports = async(req, res)=>{
    const pool_id = req.params.pool_id;
    const feed = await Reports.findOne({
        where: {
            sensor_id: 1,
            pool : pool_id
        },order: [ [ 'created_at', 'DESC' ]],
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