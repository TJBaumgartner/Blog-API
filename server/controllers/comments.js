const Comment = require('../models/comments')
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    res.send('Index')
});

exports.comment_create_get = asyncHandler(async (req, res, next) => {
    res.sendStatus(200)
});
exports.comment_create_post = asyncHandler(async(req,res,next) => {
    
    const comment = new Comment({
        comment: req.body.commentMessage,
        forPost: req.body.forPost,
        poster: req.body.user
    })
    await comment.save()
    res.status(200).json({message: "Comment posted!"})
});





exports.comment_list = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({forPost: req.params.id}).populate("poster")
    .sort({title: 1})
    .exec();
    res.json(allComments)
});

exports.comment_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Comment Delete Get')

});
exports.comment_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Comment Delete Post')
});