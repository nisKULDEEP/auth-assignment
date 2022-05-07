const express = require("express");
const app = express();

const middleware = require("../middleware/middleware");
const postController = require("../controller/post.controller");

app.put("/update/:id", middleware.isValidToken, postController.updatepost);

app.post("/create", middleware.isValidToken, postController.create);

app.delete("/delete/:id", middleware.isValidToken, postController.deletepost);

module.exports = app;
