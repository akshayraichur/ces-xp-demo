const { validationResult } = require("express-validator");
const Course = require("../models/Course");

exports.PostACourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }
  const { name, description, price, dateOfCourse, venue } = req.body;
  const image = req.files;

  if (!image) {
    return res.json({ err: "File Type Error" });
  }

  const imageUrl = image.courseImg[0].path;

  let newCourse;
  try {
    newCourse = new Course({
      name,
      description,
      price,
      dateOfCourse,
      venue,
      creator: req.user._id.toString(),
      image: imageUrl,
    });
  } catch (e) {
    return res.json({
      err: "There was some problem with creating the course",
    });
  }

  let saveCourse;
  try {
    saveCourse = await newCourse.save();
  } catch (e) {
    return res.json({ err: "There was some error with saving the db" });
  }

  if (!saveCourse) {
    return res.json({
      err: "There was some error with saving the course in the db",
    });
  }

  return res.json({ message: "Course Added!", Course: saveCourse });
};

exports.getAllCourses = async (req, res, next) => {
  let getAllCourses;
  try {
    getAllCourses = await Course.find();
  } catch (e) {
    return res.json({ err: "something went wrong" });
  }

  if (!getAllCourses) {
    return res.json({ err: "There is no Course to display" });
  } else {
    return res.status(201).json({ message: "Found!", Course: getAllCourses });
  }
};

exports.editCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "validation error" });
  }

  const { cid } = req.params;

  let existingCourse;
  try {
    existingCourse = await Course.findById(cid);
  } catch (e) {
    console.log(e);
    return res.json({
      err: "There was some error with finding the Course! Course doesnt exist",
    });
  }

  if (!existingCourse) {
    return res.json({ err: "Course doesnt exist" });
  }

  const { name, description, price, dateOfCourse, venue } = req.body;
  const image = req.files;

  let imageUrl;
  if (Object.keys(image).length === 0) {
    imageUrl = existingCourse.image;
  } else {
    imageUrl = image.courseImg[0].path;
  }

  if (existingCourse.creator.toString() === req.user._id.toString()) {
    existingCourse.name = name;
    existingCourse.description = description;
    existingCourse.price = price;
    existingCourse.dateOfCourse = dateOfCourse;
    existingCourse.venue = venue;
    existingCourse.image = imageUrl;

    let updatedCourse;
    try {
      updatedCourse = await existingCourse.save();
    } catch (e) {
      return res.json({ err: "Error saving the db" });
    }

    return res.json({
      message: "Edit complete",
      Conference: updatedCourse,
    });
  } else {
    return res.json({ err: "You are not allowed to edit this Conference" });
  }
};

exports.deleteCourse = async (req, res, next) => {
  const { cid } = req.params;

  let existingCourse;
  try {
    existingCourse = await Course.findById(cid);
  } catch (e) {
    return res.json({ err: "There was some error finding the Course" });
  }

  if (!existingCourse) {
    return res.json({ err: "No Course found!" });
  }

  if (existingCourse.creator.toString() === req.user._id.toString()) {
    let removeCourse;
    try {
      removeCourse = await Course.findByIdAndRemove(cid);
      return res.json({ message: "Deleted!" });
    } catch (e) {
      return res.json({ err: "WE couldn't delete it " });
    }
  }
};

exports.getSingleCourse = async (req, res, next) => {
  const { coid } = req.params;
  let findCourse;
  try {
    findCourse = await Course.findById(coid);
  } catch (e) {
    return res.json({ err: "There was some error fetching the course" });
  }

  if (!findCourse) {
    return res.json({ err: "No such course found" });
  } else {
    return res.json({ course: findCourse });
  }
};
