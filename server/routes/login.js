const express = require("express");
const User = require("../modal/userSchema");
const env = require("dotenv").config();
const secret = process.env.SECRET;
const loginRouter = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("../app");

loginRouter.get("/", async (req, res, next) => {
    const user = req.body.user ? req.body.user : "BAD"
    const user2 = {
        name: "sfhg"
    }
    const accessToken = generateAccessToken(user2);
    res.send(accessToken)
})

function generateAccessToken(user2) {
  return jwt.sign(user2, secret, { expiresIn: '10s' });
}

loginRouter.get("/" , (req ,res) => {
    return res.send("fsafs")
})

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
