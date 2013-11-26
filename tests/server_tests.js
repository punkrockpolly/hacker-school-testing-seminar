var tester = require('./tester').tester;
var server = require('../server').server;
var http = require('http');

var mockRes = function(expectedString, done) {
  http.ServerResponse.prototype.end = function(data) {
    tester.isEqual(data.substring(0, expectedString.length),
                   expectedString);
    console.log("assertion checked");

    if (done !== undefined) {
      done();
    }
  };

  return new http.ServerResponse({});
};

var genericTest = function(urlString, searchString, done) {
    server.requestHandler({ url: urlString },
                          mockRes(searchString, done));
}

// Demo async tests
tester.test(
  'should serve index.html when go to "/" URL', function(done) {
    genericTest("/", "<!doctype", done);
  },

  'should serve client.js when go to "/client.js" URL', function(done) {
    genericTest("/client.js", ";(function(exports) {\n  exports.get", done);
  },

  'should serve canvas-renderer.js when go to "/canvas-renderer.js" URL', function(done) {
    genericTest("/canvas-renderer.js", ";(function(exports) {\n  exports.can", done);
  },

  'should serve time.json when go to "/time.json" URL', function(done) {
    genericTest("/time.json", '{ "time":', done);
  }
);

