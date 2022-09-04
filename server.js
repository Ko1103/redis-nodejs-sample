const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const Redis = require("ioredis");
const app = express();

app.use(express.static("public"));
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

const redis = new Redis("redis"); //redis container
const client = new Redis("redis");

function subscribeMessage(channel) {
  client.subscribe(channel);
  client.on('message', function(channel, message) {
    broadcast(JSON.parse(message))
  });
}
subscribeMessage('newMessage')

// broadcast message to all clients
function broadcast(message){
  wss.clients.forEach(function(client){
    client.send(JSON.stringify({
        message: message
    }))
  })
}

wss.on('connection', function (ws, request) {
  ws.on('message', function (message) {
    redis.publish('newMessage', JSON.stringify(message))
  });

  -- 省略 --
});
