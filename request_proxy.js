var https = require('https');
const fs = require('fs');
var request = require('request');

const APPID = "0411538bd3bf7707"
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

https.createServer(options, function (req, res) {
  if (req.url.lastIndexOf("/conditions") === 0) { // starts with
    var base_target = "https://api.wunderground.com/api/" + APPID;
    var target = base_target + req.url;
    request(target, function (error, response, body) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(body);
    })    
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end("");
  }
}).listen(8080);

console.log('Server running at https://localhost:8080/');
