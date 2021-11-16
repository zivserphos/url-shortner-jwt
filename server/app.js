require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const shortUrlRouter = require("./routes/shortUrlRoute");
const loginRouter = require("./routes/login");
const signUpRouter = require("./routes/signUp");
const statsRoute = require("./routes/statsRoute");
const errorHandler = require("./handlers/errorHandler");
const reDirectRouter = require("./routes/reDircetRouter");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(cors());
// body-parser
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/app", express.static(path.resolve(`./server/dist`)));

app.use("/login", loginRouter);

app.get("/app/login", (req, res) => {
  res.sendFile(path.resolve("./server/dist/login.html"));
});

app.get("/app/signUp", (req, res) => {
  res.sendFile(path.resolve("./server/dist/signUp.html"));
});

app.use("/signUp", signUpRouter);

app.use("/", reDirectRouter);
//app.use(express.static(path.resolve(`./dist`)));

app.use("/api/shorturl/", shortUrlRouter);
app.use("/api/statistic", statsRoute);
app.use(errorHandler);

app.get("/app", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

module.exports = app;
