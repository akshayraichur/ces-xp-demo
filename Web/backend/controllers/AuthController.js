const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.Register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "There is a validation error" });
  }

  const { name, email, address, password, phoneNumber } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return res.json({ err: "There was some internal error " });
  }

  if (existingUser) {
    return res.json({
      err: "the user already exists in the Db, so please signin",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return res.json({ err: "There is some problem with the password hashing" });
  }

  const newUser = new User({
    name,
    email,
    address,
    password: hashedPassword,
    phoneNumber,
    courses: [],
    workshops: [],
    conferences: [],
  });

  let saveNewUser;
  try {
    saveNewUser = await newUser.save();
  } catch (e) {
    console.log(e);
    return res.json({ err: "There was some problem saving the user in DB" });
  }

  return res.json({ message: "User created successfully", user: saveNewUser });
};

exports.Login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "There is a validation error" });
  }
};

exports.Logout = (req, res, next) => {};
