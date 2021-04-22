const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const authCheck = require("../middleware/check-auth");
const extractFile = require('../middleware/file');

router.post("/signup", UserController.createuser);

router.post("/login", UserController.userLogin);
router.put("/edit-profile", authCheck, extractFile, UserController.editProfile);
router.get("", UserController.userSearch);
router.get("/:id", UserController.getUser);

module.exports = router;
