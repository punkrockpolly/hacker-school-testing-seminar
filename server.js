var http = require('http');
var fs = require('fs');

var DAY = "day";
var NIGHT = "night";


var server = {
  requestHandler: function (req, res) {
    
    var res_Write = function(ContentType, data){
      res.writeHead(200, { 'Content-Type': ContentType});
      res.end(data);
    };

    if (req.url === "/") {
      fs.readFile(__dirname + '/index.html', 'utf8', function (err, data) {
        res_Write('text/html', data);
      });
    } else if (req.url === "/client.js") {
      fs.readFile(__dirname + '/client.js', 'utf8', function (err, data) {
        res_Write('application/javascript', data);
      });
    } else if (req.url === "/canvas-renderer.js") {
      fs.readFile(__dirname + '/canvas-renderer.js', 'utf8', function (err, data) {
        res_Write('application/javascript', data);
      });
    } else if (req.url === "/time.json") {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var hour = new Date().getHours();
      var time = hour > 6 && hour < 20 ? DAY : NIGHT;
      res.end('{ "time": "' + time + '" }');
    }
    else {
      console.log("bad things");
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end("you broke the internet!");
    }
  }
};

http.createServer(server.requestHandler).listen(4000);

exports.server = server;
