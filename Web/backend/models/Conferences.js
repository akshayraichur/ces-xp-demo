const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conferenceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dateOfConference: {
      type: String,
    },
    venue: {
      type: String,
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conference", conferenceSchema);
