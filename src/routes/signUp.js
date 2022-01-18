const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../modal/userSchema");
require("dotenv").config();

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res, next) => {
  // try and catch / bcrypt
  const { newUser } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = encryptPassword;
  try {
    return res.send(await User.insertMany(newUser));
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
});

module.exports = signUpRouter;
