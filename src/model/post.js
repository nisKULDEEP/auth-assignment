const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model("post", postModel);
