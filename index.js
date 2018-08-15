"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

var encodedPat = encodePat('gpoj72wmahfytarae6vqwuztzwe5xao62e36iw2r6ujgu225b5fq');
var jsonbody=JSON.stringify({ definition : {id : 7},sourceBranch: "refs/heads/master" });

var options = {
   method: 'POST',
   headers: { 'content-type': 'application/json', 'authorization': `Basic ${encodedPat}` },
   url: 'https://akhileshyadav.visualstudio.com/DefaultCollection/Salesforce/_apis/build/builds?api-version=2.0',
   body : jsonbody
   
};
function encodePat(pat) {
   var b = new Buffer(':' + pat);
   var s = b.toString('base64');
 
   return s;
}
const restService = express();
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.get("/demo", function(req, res) {
  
  request(options, function (error, response, body) {
	  //code=response.statusCode;
	console.log(response.statusCode);
  if (error) throw new Error(error);
  
  //console.log(body);
  var config = JSON.parse(body);
  console.log(config.id);
  return res.send("Test smart agent ok"+config.id);
});
  
});

restService.post("/test", function(req, res) {
  var restext =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.suitename
      ? req.body.result.parameters.suitename
      : "";
  
  //--------------------------------------------
  request(options, function (error, response, body) {
	  //code=response.statusCode;
	console.log(response.statusCode);
  if (error) throw new Error(error);
  
  //console.log(body);
  var config = JSON.parse(body);
  console.log(config.id);
  restext="Congrats, Build "+restext+" is started."
  return res.json({"fulfillmentMessages": [
      {
        "text": {
          "text": [
            restext
          ]
        }
      }
    ]
  });
});
  
  //--------------------------------------------    
  
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
