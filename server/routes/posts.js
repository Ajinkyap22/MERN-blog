const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.posts);

// POST create post
router.post("/create", verifyToken, postController.create_post);

// POST publish post
router.post("/:post_id/publish", verifyToken, postController.publish);

// POST unpublish post
router.post("/:post_id/unpublish", verifyToken, postController.unpublish);

// PUT update post
router.put("/:id/update", verifyToken, postController.post_update);

// DELETE delete post

// GET single post

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
