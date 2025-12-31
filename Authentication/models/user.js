const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userAdd");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
