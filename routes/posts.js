const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../config/verifyToken");

// GET all posts
router.get("/", postController.posts);

// POST create post
router.post("/create", verifyToken, postController.create_post);

// POST publish post
router.post("/:id/publish", verifyToken, postController.publish);

// POST unpublish post
router.post("/:id/unpublish", verifyToken, postController.unpublish);

// PUT update post
router.put("/:id/edit", verifyToken, postController.post_update);

// DELETE delete post
router.delete("/:id/delete", verifyToken, postController.delete_post);

// GET single post
router.get("/:id", postController.post_get);

// get post likes
router.get("/:id/likes", postController.likes);

// like post
router.put("/:id/like", verifyToken, postController.like);

// dislike post
router.put("/:id/dislike", verifyToken, postController.dislike);

module.exports = router;
