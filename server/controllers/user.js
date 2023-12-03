const User = require('../models/user')
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt')


exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("signup", {title: "Sign Up"});
});


exports.sign_up_post = asyncHandler(async (req, res, next) => {
    try{
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);
    
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
