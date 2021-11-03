const express = require("express");
const shortUrlRouter = express.Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../class/db");
const { isURL } = require("validator");
const { nextTick } = require("process");

shortUrlRouter.post("/", async (req, res, next) => {
  if (isURL(req.body.originUrl)) {
    return res.send(await dataBase.addObjToDb(req.body.originUrl));
  } else {
    next({ status: 400, message: { error: "INVALID URL" } });
  }
});

module.exports = shortUrlRouter;
