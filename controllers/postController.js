require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// get all posts
exports.posts = function (req, res) {
  Post.find()
    .sort([["timestamp", "descending"]])
    .populate("author")
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
  body("content", "Title cannot be empty").trim().isLength({ min: 1 }),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const { title, content, published, imgUrl } = req.body;

    Post.create(
      {
        title,
        content,
        author: req.authData._id,
        published,
        timestamp: Date.now(),
        imgUrl,
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
  };

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
  body("content", "Title cannot be empty").trim().isLength({ min: 1 }),

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
      imgUrl: req.body.imgUrl,
      _id: req.params.id,
    });

    // update post
    Post.findByIdAndUpdate(req.params.id, post, { new: true })
      .populate("author")
      .exec((err, newPost) => {
        if (err) return res.json(err);

        return res.json(newPost);
      });
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
  Post.findById(req.params.id)
    .populate("author")
    .exec((err, post) => {
      if (err) return res.json(err);

      return res.json(post);
    });
};

// like post
exports.like = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.body.user_id } },
    { new: true },
    function (err, post) {
      if (err) return res.json(err);

      return res.json(post.likes);
    }
  );
};

// dislike post
exports.dislike = function (req, res) {
  Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.body.user_id } },
    { new: true },
    function (err, post) {
      if (err) return res.json(err);

      return res.json(post.likes);
    }
  );
};

// get post likes
exports.likes = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);

    return res.json(post.likes);
  });
};
