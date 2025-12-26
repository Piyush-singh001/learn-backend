const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");

const UserRouter = express.Router();
UserRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = UserRouter;
