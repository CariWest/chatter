# Chatter

Chatter is a simple chat application using Node.js, Express, Socket.io, and Redis. Users are able to log in to the chat with a username, see other users who are logged in, and chat with those in the room. Chatting is possible through Socket.io, and the chat history is preserved through Redis.

## To use this App:
  1. Clone the repository to your desktop
  2. Initiate Redis (installation instructions [here](http://redis.io/topics/quickstart) if it's your first time)
  3. Run your redis client: `redis-server`
  4. Run the app: `node app`
  5. Navigate to [localhost](http://localhost:3000)
  6. Log in & chat!

## Functionality
  * Users can connect to a chat room
  * Users can sign up with a username
  * Users can send a message to other users in the chat room
  * Users receive messages in real time
  * Message history is preserved through a database

## Future Plans
  * Users will be able to initiate private chats with a specific user
  * Users will not be able to use a username which is already in use
  * Users will be able to sign in
  * Tests. Always more tests
