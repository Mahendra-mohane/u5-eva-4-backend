const express = require('express')
const UserModel = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const redis=require("../connection/redis")
const userrouter = express.Router()

userrouter.post("/register", async (req, res) => 
{
    try {
        const {name, email, password} = req.body
        const user= await UserModel.findOne({ email })
        if (user) 
        {
            return res.send({ msg: "User already present login" })
        }
        bcrypt.hash(password, 5, async (err, hash) => 
        {
            const newuser = new UserModel({ name, email, password: hash })
            await newuser.save()
            res.status(200).send({ msg: "Registration Succesful" })

    })
}
     catch (error) 
    {
        res.status(401).send({ msg: error.message })
    }
})

userrouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        if(!user)
        {
            return res.send({msg:"No user found"})
        }
        bcrypt.compare(password,user.password,(err,result)=>
        {
            if(result)
            {
                const token=jwt.sign({userID:user._id},process.env.secretkey,{expiresIn:"6h"})
                res.status(200).send({msg:"login succesful",token})
            }
            else
            {
                return res.status(401).send({msg:"invalid credintials"})
            }
        })
    }
    catch (error) 
    {
        res.status(401).send({msg:error.message})
    }
})


userrouter.get("/logout",(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    redis.set(token,1,"EX",60*60)
    res.status(200).send({msg:"Logout successful"})
})
module.exports = userrouter