var socket = io();
var username;
var privateChat;

var newUserListener = function() {
  $('.username form').on('submit', function(event) {
    event.preventDefault();
    socket.emit('join', $('#username').val());
    $('#username').val('');
    $('.username').hide();
    $('.chat').show();
  });
}

var userLogsIn = function() {
  socket.on('addUser', function(username) {
    $('#current-users').append('<li id=' + username + '>' + username + '</li>');
  });
}

var userLogsOff = function() {
  socket.on('removeUser', function(username) {
    $('#' + username).remove();
  })
}

var chatListener = function() {
  $('.chat form').on('submit', function(event) {
    event.preventDefault();
    socket.emit('sendChat', $('#msg').val());
    $('#msg').val('');
  });
}

var receiveChat = function() {
  socket.on('sendChat', function(msg, username) {
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
  newUserListener();
  userLogsIn();
  chatListener();
  receiveChat();
  userLogsOff();
})