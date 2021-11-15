const express = require("express");
const statsRoute = express.Router();
const fs = require("fs");
const { stat } = require("fs/promises");
const db = require("../class/db");
const path = require("path");

module.exports = statsRoute;

statsRoute.get("/:shortUrl", async (req, res, next) => {
  try {
    console.log("51");
    const stats = await db.getObjectByShortUrl(req.params.shortUrl);
    if (!stats) {
      throw { status: 404, message: { error: "URL IS NOT EXIST IN DATABASE" } };
    }
    res.send(stats);
  } catch (err) {
    console.log("zivi");
    next(err);
  }
});

statsRoute.get("/", (req, res) => console.log("zain"));
