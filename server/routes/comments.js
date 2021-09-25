const express = require("express");
const router = express.Router();
const commentrController = require("../controllers/commentController");
const verifyToken = require("../config/verifyToken");

// GET all comments
router.get("/", commentrController.comments);

// create comment
router.post("/", verifyToken, commentrController.create_comment);

// edit comment

// delete comment

// get single comment

module.exports = router;
