const express = require("express");
const app = express();
const UserRouter = require("./routes/userRouter");
const HostRouter = require("./routes/hostRouter");

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(UserRouter);
app.use(HostRouter);

const PATH = 3000;
app.listen(PATH, () => {
  console.log(`Server is running on port http://localhost:${PATH}`);
});
