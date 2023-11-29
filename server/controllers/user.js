const User = require('../models/user')
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')


exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("signup", {title: "Sign Up"});
});


exports.sign_up_post = [

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);


        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);
            
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hash,
        });

        if(!errors.isEmpty()){res.render("signup", {
            title: "Sign Up", 
            user: user, 
            errors: errors.array()
        });
        return;
        } else {
            await user.save();
            res.redirect("/")
        }
    }),
];
