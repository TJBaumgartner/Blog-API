const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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


exports.login = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if(user == null) {
        return res.status(400).send('Cannot find User')
    }
    try{
      const match = await bcrypt.compare(req.body.password, user.password)
      if(match){
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN)
          res.json({accessToken: accessToken})
        }
    } catch(err) {
      console.log(err)
        res.status(500).send('No user')
    }
})
