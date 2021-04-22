const express = require('express');
const router = express.Router();
const authCheck = require("../middleware/check-auth");
const PostController = require('../controllers/friends');

router.post("", authCheck, PostController.sendRequest);
router.get("/requests", authCheck, PostController.receivedRequests);
router.post("/accept/:id", authCheck, PostController.acceptRequest);
router.get("/friends", authCheck, PostController.getFriends);
router.get("/sentrequest", authCheck, PostController.sentRequests);
router.post("/cancelrequest", authCheck, PostController.cancelRequest);
router.post("/denyrequest", authCheck, PostController.denyRequest);
router.post("/remove", authCheck, PostController.removeFriend);

module.exports = router;
