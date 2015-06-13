var socket = io();

var chatListener = function() {
  $('form').submit(function() {
    debugger
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
}

var receiveChat = function() {
  socket.on('chat message', function(msg) {
    debugger
    $('#messages').append('<li>').text(msg)
    // somehow re-serves the page without the form?
  });
}

$(document).ready(function() {
  chatListener();
  receiveChat();
})