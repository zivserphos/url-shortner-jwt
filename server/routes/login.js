const express = require("express");
const User = require("../modal/userSchema");
const env = require("dotenv").config();
const secret = process.env.SECRET;
const loginRouter = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../app");

loginRouter.post("/", async (req, res, next) => {
  console.log("zain");
  const userData = {
    userName: req.body.userName,
    password: req.body.password,
  };
  const user = await User.findOne({ userName: userData.userName });
  console.log(user);
  if (!user) throw "problem";
  if (user.password === userData.password) {
    const accessToken = generateAccessToken(user);
    res.cookie("token", accessToken, { maxAge: 100000 });
    res.send();
    //res.redirect("/app/");
  }
});

function generateAccessToken(user) {
  return jwt.sign({}, secret, { expiresIn: "600s" });
}

loginRouter.get("/", (req, res) => {
  return res.send("fsafs");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.secret, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = loginRouter;
