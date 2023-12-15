var express = require('express');
var router = express.Router();

const posts = require('../controllers/posts');
const comments = require('../controllers/comments');
const user = require('../controllers/user');
const authenticate = require('../controllers/authenticate')

router.get("/", comments.index);

router.get("/comments", comments.comment_list);

router.get("/comments/create", comments.comment_create_get);
router.post("/comments/create", comments.comment_create_post);

router.get("/comments/:id/delete", comments.comment_delete_get);
router.post("/comments/:id/delete", comments.comment_delete_post);


router.get("/posts", posts.post_list);

router.get("/posts/create", authenticate, posts.post_create_get);
router.post("/posts/create", posts.post_create_post);

router.get("/posts/:id", posts.post_detail_get);
router.post("/posts/:id", posts.post_detail_post);

router.get("/posts/:id/comments", comments.comment_list);

// router.get("/posts/:id/delete", posts.post_delete_get);
// router.post("/posts/:id/delete", posts.post_delete_post);

router.post("/user/create", user.sign_up_post)

router.post("/login", user.login)
router.post("/logout", user.logout)

router.post("/token", user.token)


module.exports = router;
