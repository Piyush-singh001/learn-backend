const express = require("express");
const HostRouter = express.Router();
const path = require("path");
const rootDir = require("../utils/path");

HostRouter.get("/host", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "host.html"));
});
const hostDetail = [];

HostRouter.post("/host/detail-submit", (req, res) => {
  hostDetail.push(req.body.detail);
  console.log("Host Detail Received:", hostDetail);
  res.render("showDetails", { details: hostDetail });
});

module.exports = HostRouter;
