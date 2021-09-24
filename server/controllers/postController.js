const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// get all posts
exports.posts = function (req, res) {
  Post.find()
    .sort([["timestamp", "descending"]])
    .exec((err, posts) => {
      if (err) return res.json(err);

      return res.json(posts);
    });
};

// create post
exports.create_post = [
  // validate and sanitize
  body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const { title, content, published } = req.body;

    Post.create(
      {
        title,
        content,
        author: req.body.author,
        published,
        timestamp: Date.now(),
      },
      (err, post) => {
        if (err) return res.json(err);

        post.populate("author", (err, newPost) => {
          if (err) return res.json(err);

          return res.json(newPost);
        });
      }
    );
  },
];

// publish post
exports.publish = function (req, res) {
  Post.findOneAndUpdate(
    { _id: req.params.post_id },
    { published: true },
    { useFindAndModify: false, new: true }
  )
    .populate("author")
    .exec((err, post) => {
      if (err) return res.status(400).json(err);
      res.json(post);
    });
};
