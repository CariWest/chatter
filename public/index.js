var socket = io();

var usernameListener = function() {
  $('.username form').on('submit', function(event) {
    event.preventDefault();
    var $username = $('.username').find('input')
    socket.emit('username', $username.val());
    $username.val('');
    $('.username').hide();
    $('.chat').show();
    return false;
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

var userLogsIn = function() {
  socket.on('username', function(username) {
    $('#current-users').append('<li>' + username + '</li>');
  });
}

var receiveChat = function() {
  socket.on('chat message', function(msg, username) {
    $('#messages').append('<li>'+ username + " says: " + msg + '</li>')
  });
}

$(document).ready(function() {
  usernameListener();
  userLogsIn();
  chatListener();
  receiveChat();
})