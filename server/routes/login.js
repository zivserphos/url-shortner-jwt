/* eslint-disable no-use-before-define */
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../modal/userSchema");

const secret = process.env.SECRET;
const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  const userData = {
    userName: req.body.userName,
    password: req.body.password,
  };
  try {
    const user = await User.findOne({ userName: userData.userName });
    // if (user.password === userData.password) {
    if (await bcrypt.compare(userData.password, user.password)) {
      const accessToken = generateAccessToken(user);
      res.cookie("token", accessToken, { maxAge: 3600000 });
      return res.send();
    }
    throw { status: 401, message: { error: "WRONG PASSWORD" } };
  } catch (err) {
    return next(err);
  }
});

// loginRouter.delete("/logout");

function generateAccessToken(user) {
  return jwt.sign({ user }, secret, { expiresIn: "1h" });
}

loginRouter.get("/", (req, res) => res.send("fsafs"));

module.exports = loginRouter;
