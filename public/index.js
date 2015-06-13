var socket = io();

var chatListener = function() {
  $('form').submit(function(e) {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
}

var receiveChat = function() {
  socket.on('chat message', function(msg) {
    $('#messages').append('<li>' + msg + '</li>')
  });
}

$(document).ready(function() {
  chatListener();
  receiveChat();
})