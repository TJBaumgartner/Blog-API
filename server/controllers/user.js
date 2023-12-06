const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
require("dotenv").config();

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("signup", {title: "Sign Up"});
});


exports.sign_up_post = asyncHandler(async (req, res, next) => {
    try{
        const hash = await bcrypt.hash(req.body.password, 10);
    
        const user = new User({
            username: req.body.username,
            password: hash,
            isBlogger: false
        });
        await user.save()
    } catch {
        res.status(500).send()
    }
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '5m'})
}
exports.login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if(user == null) {
        return res.status(400).send('Cannot find User')
    }
    try{
      const match = await bcrypt.compare(req.body.password, user.password)
      if(match){
            const accessToken = generateAccessToken(user.toJSON())
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN)
            console.log(refreshToken)
            const token = new Token({token: refreshToken})
            await token.save()
            res.json({accessToken: accessToken, refreshToken: refreshToken, admin: user.isBlogger, name: user.username})
        } else {
            return res.status(403).send('Incorrect Password')
        }
    } catch(err) {
      console.log(err)
        res.status(500).send('No user')
    }
})
exports.logout = asyncHandler(async (req,res,next) => {
    const token = req.body.token
    if(token == null) return res.sendStatus(404)
    const clearToken = await Token.findOne({token: token})
    if(!clearToken){
        return res.sendStatus(403)
    }
    await Token.findOneAndDelete({token: req.body.token});
    return res.sendStatus(200)
})
exports.token = asyncHandler(async (req,res,next) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    const token = await Token.findOne({token: refreshToken})
    if (!token){
        return res.sendStatus(403)
    }
    try{
        const user = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN
        );
        const newAccessToken = generateAccessToken({user: user.username})
        res.json({ accessToken: newAccessToken})
    } catch(err) {
        console.log(err)
        res.sendStatus(401)
    }
})
