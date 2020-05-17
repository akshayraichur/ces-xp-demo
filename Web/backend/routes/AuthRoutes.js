const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const passport = require("passport");
const passportConfig = require("../middleware/passport");
const isAdmin = require("../middleware/isAdmin");
const isCreator = require("../middleware/isCreator");

const AuthController = require("../controllers/AuthController");

router.post(
  "/register",
  [
    check("email").normalizeEmail().isEmail(),
    check("name").not().isEmpty(),
    check("address").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 6 }),
    check("phoneNumber").isLength({ min: 9, max: 10 }),
  ],
  AuthController.Register
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  AuthController.Login
);

router.get("/logout", AuthController.Logout);

module.exports = router;
