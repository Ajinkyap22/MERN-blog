const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.users_get);

// POST login
router.post("/login", userController.login_post);

// POST signup
router.post("/signup", userController.signup_post);

// get single user
router.get("/:id", userController.user);

module.exports = router;
