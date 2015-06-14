var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sendChat = function(msg, username) {
  io.emit('chat message', msg, username);
}

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var username;

  socket.on('user logs in', function(newUser) {
    username = newUser;
    var msg = "logged on"
    io.emit('user logs in', username);
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
