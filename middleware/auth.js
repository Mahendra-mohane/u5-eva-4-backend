const jwt=require("jsonwebtoken")
require("dotenv").config()
redis=require("../connection/redis")

const auth=async(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]

    if(token){
        const isBlacklisted=await redis.get(token)
        if(isBlacklisted){
            return res.status(401).send({msg:"you have logout login  again"})
        }
        jwt.verify(token,process.env.secretkey,(err,decoded)=>{
            if(decoded){
                next()
            }else{
                return res.status(501).send({msg:"session expired"})
            }
        })

    }else{
        res.status(401).send({msg:"Login first"})
    }
}
module.exports=auth