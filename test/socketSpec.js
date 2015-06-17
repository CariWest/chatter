var should = require('should');
var io = require('socket.io-client');
var socketUrl = 'http://0.0.0.0.3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
}

var chatUser1 = { username: "Cari" }
var chatUser2 = { username: "Doug" }



describe("Chat Server", function() {
  var client1 = io.connect(socketUrl, options);
  var client2 = io.connect(socketUrl, options);

  it("Should broadcast a new user to all users", function() {

    client1.on('connection', function(data) {
      client1.emit('join', chatUser1.username);

      client2.on('connection', function(data) {
        client2.emit('join', chatUser2.username);
      });

      client2.on('addUser', function(newUser) {
        newUser.should.equal(chatUser2.username);
        client2.disconnect();
      });
    });

    var numUsers = 0;
    client1.on('addUser', function(newUser) {
      numUsers++;

      if (numUsers === 2) {
        newUser.should.equal(chatUser2.username);
        client1.disconnect();
        done();
      }
    });
  });

  it("should listen for a new chat", function() {
    client1.on('connection', function(data) {
      client1.emit('join', chatUser1.username);

      client2.on('connection', function(data) {
        client2.emit('join', chatUser2.username);
        client2.emit('sendChat', "Hello!");
        client2.disconnect();
      });

      client2.on('sendChat', function(msg, newUser) {
        msg.should.equal("Hello!");
        username.should.equal(chatUser2.newUser);
      });

      var numChats = 0;
      client1.on('sendChat', function(msg, newUser) {
        numChats++;

        if (numChats === 1) {
          msg.should.equal("Hello!");
          newUser.should.equal(chatUser2.username);
          client1.disconnect();
          done();
        }
      });
    });
  });
});