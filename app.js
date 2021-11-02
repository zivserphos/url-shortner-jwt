require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {urlencoded} = require("body-parser");
const app = express();

app.use(cors());

// body-parser
app.use(express , urlencoded({extended: true}))
app.use(express.json())

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/" , (req ,res) => {
  res.send("zibi bibi")
})

module.exports = app;
