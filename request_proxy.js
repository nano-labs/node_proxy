var express = require('express');
var request = require('request');

const APPID = "0411538bd3bf7707"

var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get(/^\/conditions.*/, function(req, res) {
    var base_target = "https://api.wunderground.com/api/" + APPID;
    var target = base_target + req.url;
    request(target, function (error, response, body) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(body);
    })    
});

app.listen(8080);