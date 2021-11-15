const express = require("express");
const reDirectRouter = express.Router();
const cors = require("cors");
const path = require("path");
const Url = require("../modal/urlsSchema")

reDirectRouter.get("/", (req, res) => {
  res.redirect("/app");
});

const updateViews = async (shortUrl) => await Url.findOneAndUpdate({shortUrl} , {$inc:{views:1}} , {new:true})

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  console.log("dudu faruk")
  try {
    const obj = (await Url.findOne({shortUrl: req.params.shortUrl}));
    const originUrl = obj.originUrl
    if (!originUrl) {
      throw { status: 404, message: { error: "Invalid Url" } };
    }
    console.log(await updateViews(obj.shortUrl))
    let startsWith = originUrl.slice(0, 4);
    console.log(startsWith)
    if (startsWith.toLowerCase() !== "http") {
      console.log("zzzzzzzzzzzzz")
      return res.redirect(`http://${originUrl}`);
    }
    return res.redirect(originUrl);
  } catch (err) {
    next(err);
  }
});

module.exports = reDirectRouter;
