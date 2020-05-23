const User = require('../models/User')

exports.getCreatorDetails = async (req, res, next) => {
    const {creator} = req.params;

    let findCreator;
    try{
        findCreator = await User.findById(creator);
    }catch(e){
        return res.json({err: 'There was some error with fetching creator details'})
    }

    if(!findCreator){
        return res.json({err: 'No such creator found'})
    }else{
        return res.json({creator: findCreator.name})
    }
}