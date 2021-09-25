require("dotenv").config();
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.comments = function (req, res) {
  Comment.find()
    .sort([["timestamp", "descending"]])
    .exec((err, comments) => {
      if (err) return res.json(err);

      return res.json(comments);
    });
};

exports.create_comment = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  body("username", "Usernmae cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Comment cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // process request
  (req, res) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json(err);

    const { username, content } = req.body;

    // create comment
    Comment.create(
      { username, content, timestamp: Date.now() },
      (err, comment) => {
        if (err) return res.json(err);

        Post.findByIdAndUpdate(
          req.params.id,
          { $push: { comments: comment } },
          function (err) {
            if (err) return res.json(err);

            return res.json(comment);
          }
        );
      }
    );
  },
];
