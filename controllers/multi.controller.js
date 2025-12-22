
exports.getAll=Model=>async(_,res)=>{
 const M=require('../models/'+Model);
 res.json(await M.find());
};

exports.create=Model=>async(req,res)=>{
 const M=require('../models/'+Model);
 res.status(201).json(await M.create(req.body));
};
