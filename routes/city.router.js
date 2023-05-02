const axios = require('axios')
const express = require('express')
const auth = require('../middleware/auth')
const redis = require('../connection/redis')
const UsercitiesModel = require('../model/usercities.model')
const cityrouter = express.Router()

cityrouter.get("/", auth, async (req, res) => {
    const city = req.query.city || req.preferredcity
    console.log(req.userID)
    // console.log(req)

    const cachedata = await redis.get(city+req.userID)
    if (cachedata) {
        console.log("from redis")
        return res.send(cachedata)
    } else {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=a435064f78b84f06838120034232904&q=${city}`) 
        const weatherdata = response.data
        redis.set(city+req.userID,JSON.stringify(weatherdata),"EX",60*60*24)
        await UsercitiesModel.findOneAndUpdate({userID:req.userID},{userID:req.userID,$push:{citiesvisited:city}},{upsert:true})
        console.log("form axios")
        res.send(weatherdata)
    }

})

cityrouter.get("/usercity",auth,async (req,res)=>
{
    const city=await UsercitiesModel.findOne({userID:req.userID})
    console.log(city)
    res.send(city)
})


module.exports = cityrouter