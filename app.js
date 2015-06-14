var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var redisClient = redis.createClient();

var sendChat = function(msg, username) {
  io.emit('chat message', msg, username);
}

// ======================================================
// APP VIEWS & ROUTES
// ======================================================
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// ======================================================
// SOCKET.IO CHAT
// ======================================================
io.on('connection', function(socket){
  var username;

  redisClient.smembers('users', function(err, names) {
    names.forEach(function(name) {
      console.log(name + " logged in");
      socket.emit('addUser', name);
    });
  });

  socket.on('join', function(newUser) {
    username = newUser;
    redisClient.sadd('users', username);

    socket.emit('addUser', username);
    socket.broadcast.emit('addUser', username);

    var msg = "logged on"
    sendChat(msg, username);
  });

  socket.on('disconnect', function() {
    var msg = "logged off"
    sendChat(msg, username)
  })

  socket.on('chat message', function(msg) {
    sendChat(msg, username);
  });
});

http.listen(3000, function() {
 console.log("listening on *:3000");
});
