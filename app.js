var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var redisClient = redis.createClient();

var addChat = function(message, username) {
  var chat = JSON.stringify({ user: username, msg: message });
  redisClient.lpush('messages', chat, function(err, res) {
    if (err) {
      logError("adding messages", err);
    }
  });
}

var sendChat = function(msg, username) {
  io.emit('chat message', msg, username);
}

var logError = function(errType, err) {
  console.log(errType + ": " + err);
  return;
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
    if (err) {
      logError("adding user", err);
    } else {
      names.forEach(function(name) {
        console.log(name + " logged in");
        socket.emit('addUser', name);
      });
    }
  });

  socket.on('join', function(newUser) {
    username = newUser;
    redisClient.sadd('users', username);

    socket.emit('addUser', username);
    socket.broadcast.emit('addUser', username);

    redisClient.lrange('messages', 0, -1, function(err, messages) {
      if (err) {
        logError("getting message history", err);
      } else if (messages) {
        messages.forEach(function(message) {
          message = JSON.parse(message);
          socket.emit('chat message', message.msg, message.user);
        });
      }
    });

    var msg = "logged on"
    sendChat(msg, username);
  });

  socket.on('disconnect', function() {
    if (username){
      redisClient.srem('users', username);
      socket.broadcast.emit('removeUser', username);
      var msg = "logged off";
      sendChat(msg, username);
    }
  });

  socket.on('chat message', function(msg) {
    addChat(msg, username);
    sendChat(msg, username);
  });
});

http.listen(3000, function() {
 console.log("listening on *:3000");
});
