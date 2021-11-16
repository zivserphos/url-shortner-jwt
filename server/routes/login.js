const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../modal/userSchema");

const secret = process.env.SECRET;
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
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

loginRouter.get("/", (req, res) => res.send("fsafs"));

module.exports = loginRouter;
