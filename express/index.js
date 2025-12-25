const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  res.send("<h1>Hello from Express server</h1>");
  next();
});
app.use("/hello", (req, res, next) => {
  console.log("This is the second middleware");
  res.send("<p>Hello from /hello route</p>");
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
