require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

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
        author: req.authData._id,
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
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { published: true },
      { useFindAndModify: false, new: true }
    )
      .populate("author")
      .exec((err, post) => {
        if (err) return res.status(400).json(err);
        res.json(post);
      });
};

// unpublish post
exports.unpublish = function (req, res) {
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { published: false },
      { useFindAndModify: false, new: true }
    )
      .populate("author")
      .exec((err, post) => {
        if (err) return res.status(400).json(err);
        res.json(post);
      });
};

// update post
exports.post_update = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  // validate and sanitize
  body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    // create new post object
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.authData._id,
      published: req.body.published,
      timestamp: Date.now(),
      _id: req.params.id,
    });

    // update post
    Post.findByIdAndUpdate(
      req.params.id,
      post,
      { new: true },
      function (err, newpost) {
        if (err) return res.json(err);

        return res.json(newpost);
      }
    );
  },
];

// delete post
exports.delete_post = function (req, res) {
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },
    Post.findByIdAndRemove(req.params.id, function (err) {
      if (err) return res.json(err);

      res.json({
        message: "Post deleted successfully",
      });
    });
};

// get single post
exports.post_get = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);

    return res.json(post);
  });
};
