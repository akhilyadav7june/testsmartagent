"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

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
  
  //--------------------------------------------
  var options = {
    hostname : 'akhileshyadav.visualstudio.com',
    port : 443,
    path : '/DefaultCollection/Salesforce/_apis/build/builds?api-version=2.0',
    method : 'POST',
    headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Basic gpoj72wmahfytarae6vqwuztzwe5xao62e36iw2r6ujgu225b5fq'
      },
    body : { 'definition' : {'id' : '7'},'sourceBranch' : 'refs/heads/master' }
};
  
  https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    console.log('data:', d);  
    //process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
  
  //--------------------------------------------    
  return res.json({"fulfillmentMessages": [
      {
        "text": {
          "text": [
            speech
          ]
        }
      }
    ]
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
