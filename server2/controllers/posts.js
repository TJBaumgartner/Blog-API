const Post = require('../models/posts')
// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");



exports.post_create_get = asyncHandler(async (req, res, next) => {
    res.status(200).send('Post get')
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
    console.log('hi')
    const allPosts = await Post.find()
    .sort({title: 1})
    .exec();
    res.json(allPosts)
});

exports.post_publish = asyncHandler(async (req, res, next) => {
    // console.log(req.body)
    const updatedPost = new Post({
        title: req.body.title,
        post: req.body.post,
        isPublished: true,
        poster: req.body.poster,
        _id: req.body._id
    });
    await Post.findByIdAndUpdate(req.body._id, updatedPost);
    res.sendStatus(200)
});

exports.post_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Posts Delete Get')

});
exports.post_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Posts Delete Post')
});
