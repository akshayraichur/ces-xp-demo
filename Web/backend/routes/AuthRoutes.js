const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

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

module.exports = router;