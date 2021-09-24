const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.posts);

// POST create post
router.post("/create", [
  passport.authenticate("jwt", { session: false }),
  postController.create_post,
]);

// POST publish post
router.post("/:post_id/publish", [
  passport.authenticate("jwt", { session: false }),
  postController.publish,
]);

// POST unpublish post

// PUT update post

// DELETE delete post

// GET single post

module.exports = router;
