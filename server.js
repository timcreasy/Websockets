const express = require('express');
const WebSocketServer = require('ws').Server;
const app = express();
let clients = [];

let server = app.listen(8080, () => {
  console.log('Listening on port 8080...');
});

const wss = new WebSocketServer({ server: server })
wss.on('connection', function connection(ws) {

  clients.push(ws)
  broadcast('New Client Joined');

  ws.on('message', function incoming(message) {
    broadcast(message);
  });
});

let broadcast = (message) => {
  let json = JSON.stringify({message: message});
  clients.forEach((client) => {
    client.send(json);
  });

};