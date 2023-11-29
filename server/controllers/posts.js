const posts = require('../models/posts')
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.send('Posts Get')
});
exports.post_create_post = [
    asyncHandler(async(req,res,next) => {
        res.send('Posts Post')
    })
];
exports.post_list = asyncHandler(async (req, res, next) => {
    res.send('Posts List')

});

exports.post_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Posts Delete Get')

});
exports.post_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Posts Delete Post')
});