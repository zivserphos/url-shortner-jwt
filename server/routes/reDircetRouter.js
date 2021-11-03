const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../class/db");

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const originUrl = await db.getOriginUrl(req.params.shortUrl);
    if (!originUrl) {
      throw { status: 404, message: { error: "Not Found" } };
    }
    res.redirect(originUrl);
  } catch (err) {
    next(err);
  }
});

module.exports = reDirectRouter;
