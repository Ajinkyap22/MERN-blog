require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

// get all users
exports.users_get = function (req, res, next) {
  User.find()
    .sort([["username", "ascending"]])
    .exec((err, users) => {
      if (err) res.json(err);

      res.json(users);
    });
};

// login
exports.login_post = function (req, res) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Incorrect Username or Password",
        user,
      });
    }

    jwt.sign(
      { _id: user._id, username: user.username },
      process.env.SECRET,
      { expiresIn: "10m" },
      (err, token) => {
        if (err) return res.status(400).json(err);
        res.json({
          token: token,
          user: { _id: user._id, username: user.username },
        });
      }
    );
  })(req, res);
};

// signup
exports.signup_post = [
  // sanitize and validate fields
  body("username", "Username must be at least 3 characters long.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must be at least 3 characters long.")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("confirmPassword", "Password must be at least 3 characters long.")
    .trim()
    .isLength({ min: 6 })
    .escape()
    .custom(async (value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Cnofirmed Password must be the same as password");
      return true;
    }),

  // process request
  async (req, res, next) => {
    // extract errors
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json({ errros: errors.array() });

    // check if username exists
    const userExists = await User.find({ username: req.body.username });
    if (userExists.length > 0) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        error: "Confirmed Password must be the same as password.",
      });
    }

    // create new user
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return next(err);

      User.create(
        { username: req.body.username, password: hash },
        (err, user) => {
          if (err) return next(err);

          jwt.sign(
            { _id: user._id, username: user.username },
            process.env.SECRET,
            { expiresIn: "5m" },
            (err, token) => {
              if (err) return next(err);

              return res.status(200).json({
                token,
                user: {
                  _id: user._id,
                  username: user.username,
                },
                message: "Signup successful",
              });
            }
          );
        }
      );
    });
  },
];

// get a single user
exports.user = async function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) res.json(err);

    res.json(user);
  });
};

exports.google = async function (req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    requiredAudience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name } = ticket.getPayload();

  User.findOneAndUpdate(
    { username: name },
    { username: name },
    { upsert: true },
    function (err, user) {
      if (err) res.json(err);

      jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: "10m" },
        (err, token) => {
          if (err) return res.status(400).json(err);
          return res.json({
            token: token,
            user: { _id: user._id, username: user.username },
          });
        }
      );
    }
  );
};
