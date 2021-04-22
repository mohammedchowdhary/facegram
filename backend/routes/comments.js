const express = require('express');
const router = express.Router();
const authCheck = require("../middleware/check-auth");
const PostController = require('../controllers/comments');



router.post('', authCheck, PostController.createComment);

module.exports = router;
