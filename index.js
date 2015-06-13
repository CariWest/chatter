// ====================================================================
// Simple app for "Hello World"
// ====================================================================

// var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//   res.send("<h1>Hello, World.</h1>");
// });

// var server = app.listen(1337, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);

// });

// ====================================================================
// Serving a simple HTML file; CSS isn't being included?
// ====================================================================

// var app = require('express')();
// var http = require('http').Server(app);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// http.listen(1337, function() {
//  console.log("listening on *:1337");
// });

// ====================================================================
// Using Socket.io
// ====================================================================

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(1337, function() {
 console.log("listening on *:1337");
});