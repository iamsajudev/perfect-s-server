
const Home=require('../models/Home');
const About=require('../models/About');
const Privacy=require('../models/Privacy');
const Terms=require('../models/Terms');

const getSingle = (Model, def) => async (_,res)=>{
 const data=await Model.findOne();
 res.json(data||def);
};

const upsert = Model => async (req,res)=>{
 const doc=await Model.findOneAndUpdate({},req.body,{upsert:true,new:true});
 res.json(doc);
};

exports.getHome=getSingle(Home,{title:'Welcome',subtitle:'Default',image:''});
exports.upsertHome=upsert(Home);

exports.getAbout=getSingle(About,{content:''});
exports.upsertAbout=upsert(About);

exports.getPrivacy=getSingle(Privacy,{content:''});
exports.upsertPrivacy=upsert(Privacy);

exports.getTerms=getSingle(Terms,{content:''});
exports.upsertTerms=upsert(Terms);
