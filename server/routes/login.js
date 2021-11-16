const express = require("express");
const User = require("../modal/userSchema");
const env = require("dotenv").config();
const secret = process.env.SECRET;
const loginRouter = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res, next) => {
  const userData = {
    userName: req.body.userName,
    password: req.body.password,
  };
  const user = await User.findOne({ userName: userData.userName });
  if (!user) throw "problem";
  if (user.password === userData.password) {
    const accessToken = generateAccessToken(user);
    res.cookie("token", accessToken, { maxAge: 100000 });
    res.send();
  }
});

// loginRouter.delete("/logout");

function generateAccessToken(user) {
  return jwt.sign({}, secret, { expiresIn: "600s" });
}

loginRouter.get("/", (req, res) => {
  return res.send("fsafs");
});

module.exports = loginRouter;
