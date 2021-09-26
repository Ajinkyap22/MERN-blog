const express = require("express");
const router = express.Router();
const commentrController = require("../controllers/commentController");
const verifyToken = require("../config/verifyToken");

// GET all comments
router.get("/", commentrController.comments);

// create comment
router.post("/create", verifyToken, commentrController.create_comment);

// edit comment
router.put("/:id/edit", verifyToken, commentrController.edit_comment);

// delete comment
router.delete("/:id/delete", verifyToken, commentrController.delete_comment);

// get single comment
router.get("/:id", commentrController.comment_get);

module.exports = router;
