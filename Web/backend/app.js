const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// Route imports
const AuthRoutes = require("./routes/AuthRoutes");
const WorkshopRoutes = require("./routes/WorkshopRoutes");
const ConferenceRoutes = require("./routes/ConferenceRoutes");
const CourseRoutes = require("./routes/CourseRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable("x-powered-by");
const corsOptions = {
  origin: "localhost:3000",
};
app.use(cors(corsOptions));

app.use(
  "/images/courses",
  express.static(path.join(__dirname, "images", "courses")),
);
app.use(
  "/images/workshops",
  express.static(path.join(__dirname, "images", "workshops")),
);
app.use(
  "/images/conferences",
  express.static(path.join(__dirname, "images", "conferences")),
);
app.use(
  "/images/profile",
  express.static(path.join(__dirname, "images", "profile")),
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "courseImg") {
      cb(null, "images/courses");
    }
    if (file.fieldname === "workshopImg") {
      cb(null, "images/workshops");
    }
    if (file.fieldname === "conferenceImg") {
      cb(null, "images/conferences");
    }
    if (file.fieldname === "profilePic") {
      cb(null, "images/profile");
    }
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "courseImg", maxCount: 1 },
    { name: "conferenceImg", maxCount: 1 },
    { name: "workshopImg", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
);

app.use("/api/auth", AuthRoutes);
app.use("/api/workshop", WorkshopRoutes);
app.use("/api/conference", ConferenceRoutes);
app.use("/api/course", CourseRoutes);

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("DB Connected"))
  .catch((err) => console.log("Some error in connecting with DB"));

app.listen(process.env.PORT, () => {
  console.log(`The web server is running on port : ${process.env.PORT}`);
});
