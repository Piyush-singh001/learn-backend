require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
  res.render("home");
});

/* ---------------- REGISTER ---------------- */
app.post("/register", async (req, res) => {
  try {
    const { username, password, email, age } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send("All fields are required");
    }

    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hash,
      email,
      age,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/* ---------------- LOGIN ---------------- */
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/* ---------------- LOGOUT ---------------- */
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.get("/dashboard", Auth, (req, res) => {
  res.send(`Welcome user ${req.user.email}`);
});
/* ---------------- AUTH MIDDLEWARE ---------------- */

const Auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

/* ---------------- SERVER ---------------- */
app.listen(process.env.PORT || 3000, () => {
  console.log("Auth server running 🚀");
});
