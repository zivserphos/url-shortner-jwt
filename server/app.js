require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const shortUrlRouter = require("./routes/shortUrlRoute");
const statsRoute = require("./routes/statsRoute");
const errorHandler = require("./handlers/errorHandler");
const reDirectRouter = require("./routes/reDircetRouter");
const app = express();

app.use(cors());
// body-parser
app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/", reDirectRouter);
app.use("/", express.static(`./dist`));
app.use("/api/shorturl/", shortUrlRouter);
app.use("/api/statistic", statsRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

module.exports = app;
