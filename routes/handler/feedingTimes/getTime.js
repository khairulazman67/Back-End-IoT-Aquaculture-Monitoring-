const {LimitspH} = require('../../../models');

module.exports = async(req, res)=>{

    const pH = await LimitspH.findAll();
    if(!pH){
        return res.status(404).json({
            status : 'error',
            message : 'pH limits not found'
        });
    }

    return res.json({
        status:'success',
        data : pH
    })
}