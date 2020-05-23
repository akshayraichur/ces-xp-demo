const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "There is a validation error" });
  }

  const { name, email, address, password, phoneNumber } = req.body;
  const image = req.files;

  if (Object.keys(image).length === 0) {
    return res.json({ err: "File type error" });
  }

  const imageUrl = image.profilePic[0].path;

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
    image: imageUrl,
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

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return res.json({ err: "Error in finding the user" });
  }

  if (!existingUser) {
    return res.json({
      err: "There is no user found in the Database, please register",
    });
  }

  let verifyPassword;
  try {
    verifyPassword = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    return res.json({ err: "There was some error in comparing the password" });
  }

  if (!verifyPassword) {
    return res.json({
      err:
        "Please check your email or password, it doesnt match with the databse",
    });
  }

  let token;
  try {
    token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10h" },
    );
  } catch (e) {
    return res.json({
      err: "There was some error with the sigining of the key",
    });
  }

  const twoYear = 1000 * 60 * 60 * 24 * 365 * 2;

  //This sets up a cookie
  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: twoYear,
  });

  return res.status(201).json({
    message: "User Logged in!",
    isAuthenticated: true,
    user: {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      address: existingUser.address,
      phone: existingUser.phoneNumber,
      photo: existingUser.image,
      image: existingUser.image,
      name: existingUser.name,
    },
    token: token,
  });
};

exports.Logout = (req, res, next) => {
  res.clearCookie("access_token");
  return res
    .status(201)
    .json({ message: "Logout successful", isAuthenticated: false, user: {} });
};

exports.Authenticate = (req, res, next) => {
  const { role, _id, name, email, address, phoneNumber } = req.user;
  if (req & req.cookies) {
    return res.json(
      { user: { name, email, address, role, phoneNumber, id: _id } },
    );
  }
};
