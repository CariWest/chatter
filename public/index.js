var socket = io();

var chatListener = function() {
  $('form').submit(function() {
    debugger
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
}

$(document).ready(function() {
  chatListener();
})