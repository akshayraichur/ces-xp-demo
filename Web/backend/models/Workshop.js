const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workshopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    dateOfWorkshop: {
      type: String,
    },
    venue: {
      type: String,
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
