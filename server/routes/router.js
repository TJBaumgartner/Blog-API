var express = require('express');
var router = express.Router();

const posts = require('../controllers/posts');
const comments = require('../controllers/comments');
const user = require('../controllers/user');
const authenticate = require('../controllers/authenticate')
/* GET users listing. */

router.get("/", comments.index);

router.get("/comments", comments.comment_list);

router.get("/comments/create", comments.comment_create_get);
router.post("/comments/create", comments.comment_create_post);

router.get("/comments/:id/delete", comments.comment_delete_get);
router.post("/comments/:id/delete", comments.comment_delete_post);


router.get("/posts", authenticate, posts.post_list);

router.get("/posts/create", authenticate, posts.post_create_get);
router.post("/posts/create", posts.post_create_post);

router.get("/posts/:id/delete", posts.post_delete_get);
router.post("/posts/:id/delete", posts.post_delete_post);

router.post("/user/create", user.sign_up_post)

router.post("/login", user.login)
router.post("/token", user.token)

// router.get("/posts/:id/update", posts.post_update_get);
// router.post("/posts/:id/update", posts.post_update_post);

module.exports = router;
