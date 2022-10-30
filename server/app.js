// ==============================
// Import
// ==============================
const Express = require("express")();
const Http = require("http").Server(Express);

// Handle CORS policy
const ServerSocket = require("socket.io")(Http, {
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST"]
    }
});
const PORT = 3000;


// ==============================
// Socket settings
// ==============================

/**
 *  clientSocket.on: handle received data on 'event' defined by client
 *  ServerSocket.emit : emit data on 'event' defined by server
*/
ServerSocket.on('connection', clientSocket => { 
  clientSocket.on('send', data => {
    ServerSocket.emit( 'message', data );
  });
});


Http.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});
