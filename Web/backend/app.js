const express = require("express");
const app = express();
const dotenv = require('dotenv')



app.listen(process.env.PORT, () => {
    console.log(`The web server is running on port : ${process.env.PORT}`)
})
