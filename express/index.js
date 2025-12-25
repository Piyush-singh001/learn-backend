const http = require("http");
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  res.end("Hello from Express server");
  
  next();
});
app.use((req, res, next) => {
  console.log("This is the second middleware");
});
const PORT = 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
