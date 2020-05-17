const { validationResult } = require("express-validator");
const Workshop = require("../models/Workshop");

exports.PostAWorkshop = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }
  const { name, description, price, dateOfWorkshop, venue } = req.body;

  //   TODO: Adding Image to the Workshop via multer

  let newWorkshop;
  try {
    newWorkshop = new Workshop({
      name,
      description,
      price,
      dateOfWorkshop,
      venue,
      creator: req.user._id.toString(),
      //   image
    });
  } catch (e) {
    return res.json({
      err: "There was some problem with creating the workshop",
    });
  }

  let saveWorkshop;
  try {
    saveWorkshop = await newWorkshop.save();
  } catch (e) {
    return res.json({ err: "There was some error with saving the db" });
  }

  if (!saveWorkshop) {
    return res.json({
      err: "There was some error with saving the workshop in the db",
    });
  }

  return res.json({ message: "Workshop Added!", workshop: saveWorkshop });
};

exports.getAllWorkshops = async (req, res, next) => {
  let getAllWorkshops;
  try {
    getAllWorkshops = await Workshop.find();
  } catch (e) {
    return res.json({ err: "something went wrong" });
  }

  if (!getAllWorkshops) {
    return res.json({ err: "There is no workshop to display" });
  } else {
    return res
      .status(201)
      .json({ message: "Found!", workshops: getAllWorkshops });
  }
};

exports.editWorkshop = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "validation error" });
  }

  const { wid } = req.params;

  let existingWorkshop;
  try {
    existingWorkshop = await Workshop.findById(wid);
  } catch (e) {
    console.log(e);
    return res.json({
      err:
        "There was some error with finding the workshop! Workshop doesnt exist",
    });
  }

  if (!existingWorkshop) {
    return res.json({ err: "Workshop doesnt exist" });
  }

  const { name, description, price, dateOfWorkshop, venue } = req.body;

  if (existingWorkshop.creator.toString() === req.user._id.toString()) {
    existingWorkshop.name = name;
    existingWorkshop.description = description;
    existingWorkshop.price = price;
    existingWorkshop.dateOfWorkshop = dateOfWorkshop;
    existingWorkshop.venue = venue;

    let updatedWorkshop;
    try {
      updatedWorkshop = await existingWorkshop.save();
    } catch (e) {
      return res.json({ err: "Error saving the db" });
    }

    return res.json({ message: "Edit complete", workshop: updatedWorkshop });
  } else {
    return res.json({ err: "You are not allowed to edit this workshop" });
  }
};

exports.deleteWorkshop = async (req, res, next) => {
  const { wid } = req.params;

  let existingWorkshop;
  try {
    existingWorkshop = await Workshop.findById(wid);
  } catch (e) {
    return res.json({ err: "There was some error finding the workshop" });
  }

  if (!existingWorkshop) {
    return res.json({ err: "No workshop found!" });
  }

  if (existingWorkshop.creator.toString() === req.user._id.toString()) {
    let removeWorkshop;
    try {
      removeWorkshop = await Workshop.findByIdAndRemove(wid);
      return res.json({ message: "Deleted!" });
    } catch (e) {
      return res.json({ err: "WE couldn't delete it " });
    }
  }
};