const express = require("express");
const User = require("../modal/userSchema");

const reDirectRouter = express.Router();

reDirectRouter.get("/", (req, res) => {
  res.redirect("/app");
});

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const { originUrl } = await User.findOne({ shorturl: req.params.shortUrl });
    if (!originUrl) {
      throw { status: 404, message: { error: "Invalid Url" } };
    }
    const startsWith = originUrl.slice(0, 4);
    if (startsWith.toLowerCase() !== "http") {
      return res.redirect(`http://${originUrl}`);
    }
    return res.redirect(originUrl);
  } catch (err) {
    return next(err);
  }
});

module.exports = reDirectRouter;
