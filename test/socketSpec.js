var io = require('socket.io-client');
var socketUrl = 'http://0.0.0.0.3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
}

var chatUser1 = { username: "Cari" }
var chatUser2 = { username: "Doug" }

describe("Chat Server", function() {
  it("Should broadcast a new user to all users", function() {

    var client1 = io.connect(socketUrl, options);

    client1.on('connection', function(data) {
      client1.emit('join', chatUser1.username);

      var client2 = io.connect(socketUrl, options);

      client2.on('connection', function(data) {
        client2.emit('join', chatUser2.username);
      });

      client2.on('addUser', function(newUser) {
        newUser.should.equal(chatUser2.username);
        chleint2.disconnect();
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
});