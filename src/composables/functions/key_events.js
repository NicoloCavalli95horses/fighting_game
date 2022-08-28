export function listenToKeyEvents(player, enemy){
    const keys = {
        a: {
          pressed: false,
        },
      
        d: {
          pressed: false,
        },
      
        w: {
          pressed: false,
        },
      
        ArrowLeft: {
          pressed: false,
        },
      
        ArrowRight: {
          pressed: false,
        },
      
        ArrowUp: {
          pressed: false,
        },
      };

    window.addEventListener("keydown", (e, keys) => {
    switch (e.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
  
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
    }
  });
  
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
  
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
    }
  });
}