const express = require('express');
const router = express.Router();
const authCheck = require("../middleware/check-auth");
const PostController = require('../controllers/posts');
const extractFile = require('../middleware/file');



router.post('',authCheck, extractFile, PostController.createPost);

router.put('/:id',authCheck, extractFile, PostController.updatePost)

router.get('',authCheck, PostController.getPosts);

router.get("/:id", PostController.getPost)

router.delete('/:id',authCheck, PostController.deletePost);

router.post('/like', authCheck, PostController.likePost);

module.exports = router;
