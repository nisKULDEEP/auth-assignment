const express = require("express");
const app = express();
const authController = require("../controller/auth.controller");

app.post("/login", authController.signIn);

app.post("/signup", authController.signUp);

module.exports = app;
