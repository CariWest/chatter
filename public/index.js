var socket = io();
var username;
var privateChat;

var newUserListener = function() {
  $('.username form').on('submit', function(event) {
    event.preventDefault();
    var $username = $('.username').find('input');
    username = $username.val();
    socket.emit('join', username);
    $username.val('');
    $('.username').hide();
    $('.chat').show();
    // $('.user-request-form').show();
    return false;
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
    socket.emit('chat message', $('#m').val());
    // privateChat.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
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

// var requestPrivateChat = function() {
//   $('.user-request-form form').on('submit', function(event) {
//     event.preventDefault();
//     socket.emit('requestPrivateChat', $('#requested-user').val());
//     $('#requested-user').val('');
//     $('.user-request-form').hide();
//     $('.chat').show();
//     return false;
//   })
// }

// var listenForPrivateChat = function() {
//   socket.on('privateChatRequest', function(requestingUser, requestedUser, chatRoomName) {
//     if (username === requestingUser || username === requestedUser) {
//       console.log("chat request received for " + username);
//       socket.emit('enterPrivateChatRoom', chatRoomName);
//       privateChat = io('/' + chatRoomName);
//     }
//   });
// }

// var receivePrivateChat = function() {
//   privateChat.on('private chat', function(msg, username) {
//     var chatMessage;
//     if(msg === "logged on" || msg === "logged off") {
//       chatMessage = username + " " + msg + " private chat"
//     } else {
//       chatMessage = username + " says: " + msg + " private chat"
//     }

//     $('#messages').append('<li>'+ chatMessage + '</li>')
//   });
// }

$(document).ready(function() {
  newUserListener();
  userLogsIn();
  chatListener();
  receiveChat();
  userLogsOff();

  // requestPrivateChat();
  // listenForPrivateChat();
  // receivePrivateChat();
})