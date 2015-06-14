var socket = io();

var usernameListener = function() {
  $('.username form').on('submit', function(event) {
    event.preventDefault();
    var $username = $('.username').find('input')
    socket.emit('username', $username.val());
    $username.val('');
    $('.username').hide();
    $('.chat').show();
  });
}

var chatListener = function() {
  $('.chat form').on('submit', function(event) {
    event.preventDefault();
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
  usernameListener();
  chatListener();
  receiveChat();
})