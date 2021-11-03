require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const shortUrlRouter = require("./routes/shortUrlRoute");
const statsRoute = require("./routes/statsRoute");
const errorHandler = require("./handlers/errorHandler");
const app = express();

app.use(cors());

// body-parser
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static(`./public`));

app.use("/api/shorturl/", shortUrlRouter);
app.use("api/statistic/:shorturl-id", statsRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) => {
  res.json("zibi bibi");
});

module.exports = app;
