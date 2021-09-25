require("dotenv").config();
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.comments = function (req, res) {
  Comment.find()
    .sort([["timestamp", "descending"]])
    .exec((err, comments) => {
      if (err) return res.json(err);

      return res.json(comments);
    });
};

exports.create_comment = [body("content").trim().isLength({ min: 1 }).escape()];
