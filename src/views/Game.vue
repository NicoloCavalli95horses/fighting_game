<template>
  <Winner />
  <HealthBar :show_clock="true" />
  <canvas />
</template>

<script setup>
// ==============================
// Imports
// ==============================
import HealthBar from "../components/HealthBar.vue";
import Winner from "../components/Winner.vue";
import { Store } from "@/stores/store";
import {
  onMounted,
  onUpdated,
  onUnmounted,
  watch,
  ref,
} from "@vue/runtime-core";

// ==============================
// Variables
// ==============================
const store = Store();
let interval = null;
const pause_loop = ref();
const frame = ref(0);
const canvas = ref();
const ctx = ref();

// Canvas background
const background = new Image();
background.src = "src/assets/img/background/background.png";

// Decoration image (utilities keys are added to image obj)
const shop = new Image();
shop.src = "src/assets/img/decorations/shop.png";
shop.width = 708;
shop.height = 128;
shop.max_frames = 6;
shop.i = 1;

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  canvas.value = document.querySelector( "canvas" );
  ctx.value = canvas.value.getContext( "2d" );
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  // Listen to keyboard event
  onKeyboard( store.getPlayer, store.getEnemy );

  // Main game loop
  interval = setInterval( updateCanvas, store.getFramerate );
});

// Stop loop and reset store properties
onUnmounted( () => {
  clearInterval( interval );
  store.$reset();
});

// ==============================
// Functions
// ==============================
function updateCanvas() {
  if ( !pause_loop.value ) {
    
    // Draw background and decorations
    drawBackground();
    drawDecoration({ 
      obj: shop,
      x_pos: 1000,
      y_pos: 240,
      scale: 3,
      speed: 15 
    });

    // Draw the players (handle: gravity, attackBox, jumping, left/right, screen borders,)
    drawPlayer({ user: store.getPlayer });
    drawPlayer({ user: store.getEnemy });

    handleDirection({ 
      player: store.getPlayer,
      enemy: store.getEnemy
    });

    // Handle collisions and subtract health if time is not out
    reactToCollision({
      player: store.getPlayer,
      enemy: store.getEnemy,
      time: store.getFightTime
    });

    // Update frame count
    frame.value++;
  }
}

/**
 * React to collision by setting 'hit' state and subtract health
 * @param {Object} player
 * @param {Object} enemy
 * @param {Object} time
 */
function reactToCollision({ player, enemy, time }) {
  if ( detectCollision( player, enemy ) && player.canAttack && time != "timeout" ) {
    player.canAttack = false;
    enemy.state = "hit";
    if (enemy.health >= player.strenght) {
      enemy.health -= player.strenght;
    } else {
      enemy.health = 0;
    }
  }

  if ( detectCollision( enemy, player ) && enemy.canAttack && time != "timeout" ) {
    enemy.canAttack = false;
    player.state = "hit";
    if ( player.health >= enemy.strenght ) {
      player.health -= enemy.strenght;
    } else {
      player.health = 0;
    }
  }
}

/**
 * Draw a player onto the canvas: it calls utility functions in order to draw the player in different states
 * @param {Object} user
 */
function drawPlayer({ user }) {
  // Apply gravity
  user.position.y += user.velocity.y;

  // Set user state and animate
  setStateAndAnimate( user );

  // Handle attackBox position while user is moving
  handleAttackBox( user );

  // Handle jumping behaviour
  if ( user.position.y + user.height + user.velocity.y >= 690 ) {
    user.velocity.y = 0;
  } else {
    user.velocity.y += user.gravity;
  }

  // Do not go beyond the screen
  if ( user.position.x + user.velocity.x >= 0 && user.position.x + user.width + user.velocity.x <= window.innerWidth ){
    user.position.x += user.velocity.x;
  } else {
    user.velocity.x = 0;
  }
}

/**
 * @param { Object } player
 * @param { Object } enemy
 * Handle keyboard event for a user
 */
function onKeyboard( player, enemy ) { 

  window.addEventListener( "keydown", e => {
    if ( player.isDead || enemy.isDead ) {
      return;
    }

    handleKey({ key: e.key, user: player });
    handleKey({ key: e.key, user: enemy });
  });

  window.addEventListener("keyup", (e) => {
    if ( player.isDead || enemy.isDead ) {
      return;
    } 

    if ( e.key == player.keys.left || e.key == player.keys.right ) {
      player.state = "idle";
      player.velocity.x = 0;
      player.lastKey = null;
    }

    if ( e.key == enemy.keys.left || e.key == enemy.keys.right ) {
      enemy.state = "idle";
      enemy.velocity.x = 0;
      enemy.lastKey = null;
    }
  });
}

/**
 * Handle keyboard events
 * @param {string} key
 * @param {user} object 
 */
function handleKey({ key, user }){
  switch ( key ) {
      // Left
      case user.keys.left:
          user.velocity.x = -5;
          user.lastKey = key;
        break;
      
      // Right
      case user.keys.right:
          user.velocity.x = 5;
          user.lastKey = key;
        break;

      // Up
      case user.keys.up:
        if ( user.position.y > window.innerHeight / 2 ) {
          user.velocity.y = -20;
        }
          user.lastKey = key;
        break;

      // Attack
      case user.keys.attack:
          user.state = "attacking";
          user.lastKey = key;
        break;
    }
}

/**
 * Set user state between "jumping, falling, running, idle, dead" and draw animation
 * @param {Object} user 
 */
function setStateAndAnimate( user ) {
  if ( user.velocity.y < 0 ) {
      user.state = "jumping";
      drawAnimation({ user, animation: user.animation.jump });
    } else if ( user.lastKey == user.keys.left || user.lastKey == user.keys.right ) {
      user.state = "running"
      drawAnimation({ user, animation: user.animation.run });
    } else if ( user.position.y < 535 ) {
      user.state = "falling";
      drawAnimation({ user, animation: user.animation.fall });
    } else if ( user.state != "attacking" && user.state != "hit" && user.state != "dead") {
      user.state = "idle";
      drawAnimation({ user, animation: user.animation.idle });
    }
    
    if ( user.health <= 0 ) {
      user.state = "dead";
      drawAnimation({ user, animation: user.animation.death, stop_after: true });
    }

    if ( user.state == "attacking" ) {
      // drawAttackBox();
      drawAnimation({ user, animation: user.animation.attack, speed: 10, idle_after: true });
    } 

    if ( user.state == "hit" ) {
      drawAnimation({ user, animation: user.animation.hit, speed: 20, idle_after: true });
    }
}

/**
 * Players always have to look at each other. Toggle 'mirror' values to swap players x position
 * @param {Object} player
 * @param {Object} enemy
 */
function handleDirection({ player, enemy }) {
  if (player.position.x >= enemy.position.x) {
    player.attackBox.offset = -200;
    player.mirror = true;
  } else {
    player.attackBox.offset = 0;
    player.mirror = false;
  }

  if (enemy.position.x >= player.position.x) {
    enemy.attackBox.offset = -200;
    enemy.mirror = false;
  } else {
    enemy.attackBox.offset = 0;
    enemy.mirror = true;
  }
}

/**
 * @param {object} player 
 * @param {object} enemy 
 * Return whether or not there is a collision between two players
 */
function detectCollision(player, enemy) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.state == "attacking"
  );
}

/**
 * @param {object} user
 * Adjust attack box (x, y) position of a player
 */
function handleAttackBox(user) {
  user.attackBox.position.x = user.position.x + user.attackBox.offset;
  user.attackBox.position.y = user.position.y;
}

/**
 * @param {object} user
 * Display attack box for debugging purposes 
 */
function drawAttackBox(user){
  ctx.value.fillRect(
    user.attackBox.position.x,
    user.attackBox.position.y,
    user.attackBox.width,
    user.attackBox.height
  );
}

/**
 * Draw a backgorund on the canvas
 */
function drawBackground() {
  ctx.value.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
}

/**
 * Draw a decoration on the canvas
 * @param {Object} obj - image object: new Image()
 * @param {Object} x_pos - x position on the canvas
 * @param {Object} y_pos - y position on the canvas
 * @param {Object} scale - scale factor
 * @param {Object} speed - the speed of the animation
 */
function drawDecoration({ obj, x_pos, y_pos, scale, speed }) {
  const frameWidth = (obj.width / obj.max_frames);
  ctx.value.drawImage(
    obj,
    obj.i * frameWidth, // cropping X (each iteration, scroll horizontally by a frame)
    0, // cropping Y (remain the same)
    frameWidth,
    obj.height,
    x_pos, // X position on the canvas of the whole image
    y_pos, // Y position on the canvas of the whole image
    frameWidth * scale, // width of the whole image
    obj.height * scale // height of the whole image
  );

  // Every n frames, perform an iteration ( i + 1)
  if (frame.value % speed === 0) {
    obj.i = obj.i == obj.max_frames - 1 ? 1 : obj.i + 1; // Restart the iteration if i > max_frames
  }
}
 
/**
 * @param {object} user - x, y position
 * @param {object} animation - src, width, height, total, i
 * @param {number} speed - fps
 * @param {boolean} idle_after - switch to idle animation after once
 */
function drawAnimation({ user, animation, speed = 15, idle_after = false, stop_after = false }) {
  
  // Create 'image' key and store a new image object in it 
  animation.image = new Image();

  // Set src format
  animation.image.src = ( user.mirror && !stop_after ) ? animation.src + "_rev.png" : animation.src + ".png";

  // Single frame width
  const frameWidth = (animation.width / animation.total);

  ctx.value.drawImage(
    animation.image,
    animation.i * frameWidth,
    0,
    frameWidth,
    animation.height,
    user.position.x - 280,
    user.position.y - 280,
    frameWidth * 3,
    animation.height * 3
  );

  // Stop any animation ('dead' state)
  if ( stop_after ) {
    if ( frame.value % speed === 0 ) {
      if (animation.i == animation.total - 1) {
        return;
      } else {
        animation.i = animation.i + 1;
      }
    }
  } else {
    // Repeat the same animation or switch to idle default animation
    if ( frame.value % speed === 0 ) {
      if ( !idle_after ) {
        // Increase counter and move to the next png frame
        animation.i = animation.i == animation.total - 1 ? 1 : animation.i + 1;
      } else {
        if ( animation.i == ( animation.total - 1 ) ) {
          animation.i = 1;
          user.state = "idle";
          user.canAttack = true;
          return;
        } else {
          animation.i = animation.i + 1;
          user.canAttack = false;
        }
      }
    }
  }
}

// ==============================
// Watcher
// ==============================
watch(
  () => store.getPauseMode,
  (pause) => (pause_loop.value = pause)
);
</script>
