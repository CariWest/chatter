var socket = io();

var chatListener = function() {
  $('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
}

var receiveChat = function() {
  socket.on('chat message', function(msg) {
    $('#messages').append('<li>').text(msg);
  });
}

$(document).ready(function() {
  chatListener();
  receiveChat();
})