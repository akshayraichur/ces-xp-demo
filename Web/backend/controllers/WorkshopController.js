const { validationResult } = require("express-validator");
const Workshop = require("../models/Workshop");

exports.PostAWorkshop = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ err: "Validation error" });
  }
  const { name, description, price, dateOfWorkshop, venue } = req.body;
  const image = req.files;

  //TODO: Error handling of image is not proper

  if (!image) {
    return res.json({ err: "File type Error" });
  }

  const imageUrl = image.workshopImg[0].path;

  let newWorkshop;
  try {
    newWorkshop = new Workshop({
      name,
      description,
      price,
      dateOfWorkshop,
      venue,
      creator: req.user._id.toString(),
      image: imageUrl,
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
  const image = req.files;

  let imageUrl;
  if (Object.keys(image).length === 0) {
    imageUrl = existingWorkshop.image;
  } else {
    // TODO: Need to delete the previos image or else it will be a waste of space
    imageUrl = await image.workshopImg[0].path;
  }

  if (existingWorkshop.creator.toString() === req.user._id.toString()) {
    existingWorkshop.name = name;
    existingWorkshop.description = description;
    existingWorkshop.price = price;
    existingWorkshop.dateOfWorkshop = dateOfWorkshop;
    existingWorkshop.venue = venue;
    existingWorkshop.image = imageUrl;

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

exports.getSingleWorkshop = async (req, res, next ) => {
  const {wid} = req.params;

  let findWorkshop;
  try{
    findWorkshop = await Workshop.findById(wid);
  }catch(e){
    return res.json({err: 'There was some network error, cant fetch the WOrkshop details'})
  }

  if(!findWorkshop){
    return res.json({err: 'There was some problem finding the Workshop'})
  }
  else{
    return  res.json({message: 'Found', workshop: findWorkshop})
  }
}