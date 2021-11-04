const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../class/db");

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    console.log(req.params);
    const originUrl = await db.getOriginUrl(req.params.shortUrl);
    if (!originUrl) {
      throw { status: 404, message: { error: "Invalid Url" } };
    }
    res.redirect(originUrl);
  } catch (err) {
    next(err);
  }
});

module.exports = reDirectRouter;
