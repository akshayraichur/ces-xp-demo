const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0, // 0 - Normal user | 1 - Creator | 2 - Admin
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  courses: { type: mongoose.Types.ObjectId, required: true, ref: "Course" },
  workshops: { type: mongoose.Types.ObjectId, requried: true, ref: "Workshop" },
  conferences: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Conference",
  },
});

module.exports = mongoose.model("user", userSchema);
