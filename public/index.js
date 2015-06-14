var socket = io();

var usernameListener = function() {
  $('.username form').on('submit', function(event) {
    event.preventDefault();
    var $username = $('.username').find('input')
    socket.emit('user logs in', $username.val());
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
  socket.on('user logs in', function(username) {
    $('#current-users').append('<li>' + username + '</li>');
  });
}

var userLogsOff = function() {
  socket.on('disconnect', function(username) {
    // find user & remove them from the chat
  })
}

var receiveChat = function() {
  socket.on('chat message', function(msg, username) {
    var chatMessage;
    if(msg === "logged on" || msg === "logged off") {
      chatMessage = username + " " + msg
    } else {
      chatMessage = username + " says: " + msg
    }

    $('#messages').append('<li>'+ chatMessage + '</li>')
  });
}

$(document).ready(function() {
  usernameListener();
  userLogsIn();
  chatListener();
  receiveChat();
})