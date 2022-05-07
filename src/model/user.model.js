const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  timestamp: { type: String, defaultValue: Date.now() },
});

module.exports = mongoose.model("users", UserModel);
