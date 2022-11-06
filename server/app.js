// ==============================
// Import
// ==============================
const Express = require("express")();
const Http = require("http").Server(Express);

// Handle CORS policy
const server = require("socket.io")(Http, {
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST"]
    }
});
const PORT = 3000;


// ==============================
// Socket settings
// ==============================

server.on('connection', client => { 
  client.on('sendPlayerData', data => { 
    client.broadcast.emit( 'sharePlayerData', data ); // send data to other players except the sender
  });
});


Http.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});
