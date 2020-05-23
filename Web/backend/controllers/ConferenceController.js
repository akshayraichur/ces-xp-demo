const { validationResult } = require("express-validator");
const Conference = require("../models/Conferences");

exports.PostAConference = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }
  const { name, description, price, dateOfConference, venue } = req.body;

  const image = req.files;

  if (!image) {
    return res.json({ err: "File Type Error" });
  }

  const imageUrl = image.conferenceImg[0].path;

  let newConference;
  try {
    newConference = new Conference({
      name,
      description,
      price,
      dateOfConference,
      venue,
      image: imageUrl,
      creator: req.user._id.toString(),
      //   image
    });
  } catch (e) {
    return res.json({
      err: "There was some problem with creating the workshop",
    });
  }

  let saveConference;
  try {
    saveConference = await newConference.save();
  } catch (e) {
    return res.json({ err: "There was some error with saving the db" });
  }

  if (!saveConference) {
    return res.json({
      err: "There was some error with saving the conference in the db",
    });
  }

  return res.json({ message: "Conference Added!", conference: saveConference });
};

exports.getAllConferences = async (req, res, next) => {
  let getAllConference;
  try {
    getAllConference = await Conference.find();
  } catch (e) {
    return res.json({ err: "something went wrong" });
  }

  if (!getAllConference) {
    return res.json({ err: "There is no workshop to display" });
  } else {
    return res
      .status(201)
      .json({ message: "Found!", conferences: getAllConference });
  }
};

exports.editConference = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "validation error" });
  }

  const { cid } = req.params;

  let existingConference;
  try {
    existingConference = await Conference.findById(cid);
  } catch (e) {
    console.log(e);
    return res.json({
      err:
        "There was some error with finding the workshop! Workshop doesnt exist",
    });
  }

  if (!existingConference) {
    return res.json({ err: "Workshop doesnt exist" });
  }

  const { name, description, price, dateOfWorkshop, venue } = req.body;
  const image = req.files;

  let imageUrl;
  if (Object.keys(image).length === 0) {
    imageUrl = existingConference.image;
  } else {
    imageUrl = image.conferenceImg[0].path;
  }

  if (existingConference.creator.toString() === req.user._id.toString()) {
    existingConference.name = name;
    existingConference.description = description;
    existingConference.price = price;
    existingConference.dateOfWorkshop = dateOfWorkshop;
    existingConference.venue = venue;
    existingConference.image = imageUrl;

    let updatedConference;
    try {
      updatedConference = await existingConference.save();
    } catch (e) {
      return res.json({ err: "Error saving the db" });
    }

    return res.json({
      message: "Edit complete",
      Conference: updatedConference,
    });
  } else {
    return res.json({ err: "You are not allowed to edit this Conference" });
  }
};

exports.deleteConference = async (req, res, next) => {
  const { cid } = req.params;

  let existingConference;
  try {
    existingConference = await Conference.findById(cid);
  } catch (e) {
    return res.json({ err: "There was some error finding the Conference" });
  }

  if (!existingConference) {
    return res.json({ err: "No Conference found!" });
  }

  if (existingConference.creator.toString() === req.user._id.toString()) {
    let removeConference;
    try {
      removeConference = await Conference.findByIdAndRemove(cid);
      return res.json({ message: "Deleted!" });
    } catch (e) {
      return res.json({ err: "WE couldn't delete it " });
    }
  }
};
