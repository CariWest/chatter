var io = require('socket.io-client');
var socketUrl = 'http://0.0.0.0.3000';

var options = {
  transports: ['websocket'],
  'force new connection': true
}

var chatUser1 = { username: "Cari" }
var chatUser2 = { username: "Doug" }