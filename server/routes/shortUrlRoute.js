/* eslint-disable no-plusplus */
const express = require("express");

const shortUrlRouter = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const url = process.env.URL;
const secret = process.env.SECRET;
const { isURL } = require("validator");
const Url = require("../modal/urlsSchema");

mongoose.connect(url);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});

function createShortUrl() {
  let shortUrl = "";
  for (let i = 0; i < 7; i++) {
    if (Math.random() < 0.5) {
      shortUrl += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    } else {
      shortUrl += String.fromCharCode(48 + Math.floor(Math.random() * 10));
    }
  }
  return shortUrl;
}

function createObj(originUrl) {
  const urlObj = {
    originUrl,
    shortUrl: createShortUrl(),
    views: 0,
    creatorDate: moment().toDate(),
  };
  return urlObj;
}

shortUrlRouter.post("/", async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw { status: 401, message: "you have to login in first" };
    }
    try {
      jwt.verify(token, secret);
    } catch (err) {
      throw { status: 401, message: "Invalid Token" };
    }
    const { originUrl } = req.body;
    if (originUrl.length > 200) {
      throw "url is too long";
    }
    if (isURL(originUrl)) {
      const obj = createObj(originUrl);
      return await Url.insertMany(obj);
      // return res.send(await dataBase.addObjToDb(req.body.originUrl));
    }
    throw "INVALID URL";
  } catch (err) {
    if (err === "INVALID URL" || err === "url is too long") {
      return next({ status: 400, message: { error: err } });
    }
    if (err.message.includes("originUrl")) {
      const originUrl = err.errors.originUrl.value;
      const { shortUrl } = await Url.findOne({ originUrl });
      return res.send(shortUrl);
    }
    if (err.message.includes("shortUrl")) {
      return res.send("try again please");
    }
    return next({ message: { error: err } });
  }
});

shortUrlRouter.get("/");

module.exports = shortUrlRouter;
