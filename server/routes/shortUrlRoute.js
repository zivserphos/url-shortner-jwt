const express = require("express");
const shortUrlRouter = express.Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../class/db");
const { isURL } = require("validator");

shortUrlRouter.post("/", async (req, res, next) => {
  try {
    if (isURL(req.body.originUrl)) {
      return res.send(await dataBase.addObjToDb(req.body.originUrl));
    } else {
      throw "INVALID URL";
    }
  } catch (err) {
    if (err === "INVALID URL") {
      return next({ status: 400, message: { error: err } });
    }
    return next({ message: { error: err } });
  }
});

shortUrlRouter.get("/");

module.exports = shortUrlRouter;
