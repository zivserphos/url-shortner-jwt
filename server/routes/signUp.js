const express = require("express");
const User = require("../modal/userSchema");
const env = require("dotenv").config();
const secret = process.env.SECRET;
console.log(secret);
const signUpRouter = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = require("../app");

signUpRouter.post("/", async (req, res) => {
  // try and catch / bcrypt
  console.log("im in sign up router");
  const newUser = req.body.newUser;
  console.log(newUser);
  console.log(await User.create(newUser));
});

module.exports = signUpRouter;
