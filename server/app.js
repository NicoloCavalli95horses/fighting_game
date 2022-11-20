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

  client.on('change_player_velocity_x', data => { 
    server.emit( 'player_velocity_x', data ); // send data to all the players
  });

  client.on('change_player_velocity_y', data => { 
    server.emit( 'player_velocity_y', data );
  });

  client.on('change_player_position_x', data => { 
    server.emit( 'player_position_x', data );
  });

  client.on('change_player_position_y', data => { 
    server.emit( 'player_position_y', data );
  });

  client.on('change_player_state', data => { 
    server.emit( 'player_state', data );
  });

});


Http.listen(PORT, () => {
  console.log(`Listening on port: ${ PORT }`);
});
