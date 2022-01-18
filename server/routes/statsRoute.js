const express = require("express");
const User = require("../modal/userSchema");

const statsRoute = express.Router();

module.exports = statsRoute;

statsRoute.get("/:shortUrl", async (req, res, next) => {
  try {
    const stats = await User.find({ shortURL: req.params.shortUrl });
    if (!stats) {
      throw { status: 404, message: { error: "URL IS NOT EXIST IN DATABASE" } };
    }
    res.send(stats);
  } catch (err) {
    next(err);
  }
});
