const Post = require('../models/posts')
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");



exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.sendStatus(200)
});
exports.post_create_post = [
    asyncHandler(async(req,res,next) => {
        const post = new Post({
            title: req.body.title,
            post: req.body.message,
            isPublished: req.body.published,
        })
        await post.save()
        res.status(200).json({message: "Post made!"})
    })
];
exports.post_list = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({isPublished: true})
    .sort({title: 1})
    .exec();
    res.json(allPosts)
});

exports.post_detail_get = asyncHandler(async (req, res, next) => {
    const postDetail = await Post.findById(req.params.id).exec();
    if(postDetail === null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }
    res.json(postDetail)
});
exports.post_detail_post = asyncHandler(async (req, res, next) => {
    res.send('Posts Delete Post')
});
