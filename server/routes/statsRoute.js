const express = require("express");
const statsRoute = express.Router();
const fs = require("fs");
const path = require("path");

module.exports = statsRoute;

statsRoute.get("/:shortUrl", async (req, res, next) => {
  try {
    console.log(req.params.shortUrl);
    let stats = await db.getObjectByShortUrl(req.params.shortUrl);
    console.log(stats);
    if (!stats) {
      throw { status: 404, message: { error: "URL IS NOT EXIST IN DATABASE" } };
    }
    res.send(stats);
  } catch (err) {
    next(err);
  }
});
