const Comment = require('../models/comments')
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send('Index')
});
exports.comment_create_get = asyncHandler(async (req, res, next) => {
    res.send('Comment Get')
});
exports.comment_create_post = [
    asyncHandler(async(req,res,next) => {
        res.send('Comment Post')
    })
];
exports.comment_list = asyncHandler(async (req, res, next) => {
    res.send('Comment List')

});

exports.comment_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Comment Delete Get')

});
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
    console.log(req.params.id)
    const commentDetail = await Comment.findById(req.params.id).exec();
    if(commentDetail === null) {
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err);
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.sendStatus(200)
});