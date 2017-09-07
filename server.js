require('dotenv').config();

const express = require('express');
const apiai = require('apiai')(process.env.APIAI_CLIENT_TOKEN);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

const server = app.listen(port);

const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('chatmessage', (text) => {
    
    // Get a reply from API.AI

    let apiaiReq = apiai.textRequest(text, {
      sessionId: process.env.APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      socket.emit('botreply', aiText); // Send the result back to the browser
    });

    apiaiReq.on('error', (error) => console.log(error));

    apiaiReq.end();

  });
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

