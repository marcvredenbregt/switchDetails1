const express = require("express");
const path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "/")));

app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});