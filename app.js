var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var username;

  socket.on('username', function(newUser) {
    username = newUser;
    console.log("user " + username + " connected");
    io.emit('username', username);
    io.emit('chat message', username + " logged on");
  });

  socket.on('disconnect', function() {
    io.emit('chat message', username + " logged off");
  })

  socket.on('chat message', function(msg) {
    console.log("message: " + msg);
    io.emit('chat message', msg, username);
  });
});

http.listen(3000, function() {
 console.log("listening on *:3000");
});