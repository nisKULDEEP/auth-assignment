const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./src/routes/auth.route");
const postRoute = require("./src/routes/post.route");
const app = express();

app.use(express.json());

//Routes
app.use("/auth", authRoute);
app.use("/post", postRoute);

const db = process.env.DB_URL;

mongoose.connect(db).then(function () {
  console.log("Server started");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

module.exports = app;
