const express = require("express");
const shortUrlRouter = express.Router();
const mongoose = require("mongoose")
const moment = require("moment")
const User = require("../modal/userSchema")
const Url = require("../modal/urlsSchema")
const env = require("dotenv").config();
const url = process.env.URL
const fs = require("fs");
const path = require("path");
const dataBase = require("../class/db");
const { isURL } = require("validator");
const { response } = require("express");

mongoose.connect(url);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

function createShortUrl()  {
  const created = true;
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
    originUrl: originUrl,
    shortUrl: "2A8X59C",
    views: 0,
    creatorDate: moment().toDate(),
  };
  return urlObj;
}

shortUrlRouter.post("/", async (req, res, next) => {
  try {
    console.log("i am here")
    const originUrl = req.body.originUrl
    if (originUrl.length > 200) {
      throw "url is too long";
    }
    if (isURL(originUrl)) {
      const obj = createObj(originUrl)
      const response = await Url.insertMany(obj)
      console.log(response)
      return
      //return res.send(await dataBase.addObjToDb(req.body.originUrl));
    } else {
      throw "INVALID URL";
    }
  } catch (err) {
    if (err === "INVALID URL" || err === "url is too long") {
      return next({ status: 400, message: { error: err } });
    }
    return next({ message: { error: err } });
  }
});

shortUrlRouter.get("/");

module.exports = shortUrlRouter;
