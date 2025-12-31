const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});
userRouter.get("/profile", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "profile.html"));
});

userRouter.post("/profile", (req, res) => {
  const { name, age } = req.body;
  console.log(`Name: ${name}, Age: ${age}`);
  res.send(`Profile updated for ${name}, age ${age}`);
});

module.exports = { userRouter };
