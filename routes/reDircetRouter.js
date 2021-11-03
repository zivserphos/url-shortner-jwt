const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../class/db");

reDirectRouter.get("/", (req, res, next) => {
  console.log("im here");
  res.send();
});

module.exports = reDirectRouter;
