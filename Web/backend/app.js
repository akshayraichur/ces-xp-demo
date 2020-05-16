const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

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
