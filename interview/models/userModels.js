const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/interviewDB")
  .then(() => {
    console.log("Connected to MongoDB for interviewDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
module.exports = mongoose.model("User", userSchema);
