const blogModels = require("../models/blogModels");

const jwt=require("jsonwebtoken")

//              <<<======authorisation====>>>

const autheraise=async function(req,res,next){
    try{
      let token=req.headers["x-api-key"];
      if(!token) return res.send("tocken is require")
    let decodedToken=jwt.verify(token,"My first Project with My freind");
    let loginUser=decodedToken.authorId;
    let blogId=req.params.blogId
    
    let checkBlogId=await blogModels.findById({_id:blogId})
    if(!checkBlogId) res.status(404).send({status:false,msg:"enter valid Blog Id"})
    if(checkBlogId.authorId!=loginUser)
    {
      return res.status(403).send({status:false,msg:"Autorization Faild"})
    }
    next();
    }
    catch(err){
      res.status(500).send({status:false,msg:err.message})
    }  
    
  }
  
module.exports.autheraise = autheraise