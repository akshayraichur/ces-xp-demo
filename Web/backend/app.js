const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const AuthRoutes = require("./routes/AuthRoutes");
const WorkshopRoutes = require("./routes/WorkshopRoutes");
const ConferenceRoutes = require("./routes/ConferenceRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable("x-powered-by");
const corsOptions = {
  origin: "localhost:3000",
};

app.use(cors(corsOptions));

app.use("/api/auth", AuthRoutes);
app.use("/api/workshop", WorkshopRoutes);
app.use("/api/conference", ConferenceRoutes);

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
