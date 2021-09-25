const express = require("express");
const router = express.Router();
const commentrController = require("../controllers/commentController");

// GET all comments
router.get("/", commentrController.comments);

// create comment

// edit comment

// delete comment

// get single comment

module.exports = router;
