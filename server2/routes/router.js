var express = require('express');
var router = express.Router();

const posts = require('../controllers/posts');
const comments = require('../controllers/comments');
const authenticate = require('../controllers/authenticate')

router.get("/posts", posts.post_list);
router.post("/posts/publish", posts.post_publish);

router.get("/posts/create", posts.post_create_get);
router.post("/posts/create", posts.post_create_post);

router.get("/posts/:id/delete", posts.post_delete_get);
router.post("/posts/:id/delete", posts.post_delete_post);

// router.get("/posts/:id/update", posts.post_update_get);
// router.post("/posts/:id/update", posts.post_update_post);

module.exports = router;
