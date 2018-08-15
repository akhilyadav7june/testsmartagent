"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.get("/echo", function(req, res) {
  
  return res.send("Test smart agent ok");
});

restService.post("/test", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.suitename
      ? req.body.result.parameters.suitename
      : "your test agent is started";
  return res.json({
    text: [speech],
    source: "testsmartsgent"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
