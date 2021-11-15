const express = require('express');
require('dotenv').config();

const secret = process.env.SECRET;
const loginRouter = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

loginRouter.get('/', async (req, res) => {
  const { user } = req.body;
  console.log(user);
  const user2 = {};
  const accessToken = generateAccessToken(user2);
  res.cookie('token', accessToken, {
    maxAge: 50000,
  });
  res.send('cookies are the best');
});

function generateAccessToken(user2) {
  return jwt.sign(user2, secret, { expiresIn: '10s' });
}

loginRouter.get('/', (req, res) => res.send('fsafs'));

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.secret, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = loginRouter;
