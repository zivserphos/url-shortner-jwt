const express = require("express");
const shortUrlRouter = express.Router();
const fs = require("fs");
const path = require("path");
const dataBase = require("../class/db");

shortUrlRouter.post("/", async (req, res) => {
  return dataBase.addObjToDb(req.body.originUrl);
});

module.exports = shortUrlRouter;
