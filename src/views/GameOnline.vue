<template>
  <Winner />
  <HealthBar :show_clock="false" />
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
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
  ref,
} from "@vue/runtime-core";
import io from "socket.io-client";
import Game from "../views/Game.vue";


// ==============================
// Variables
// ==============================
const store = Store();
let interval = null;
const pause_loop = ref();
const frame = ref(0);
const canvas = ref();
const ctx = ref();
const socket = ref();

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
onBeforeMount(() => {
  socket.value = io("http://localhost:3000");
});

onMounted(() => {
  canvas.value = document.querySelector("canvas");
  ctx.value = canvas.value.getContext("2d");
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  // Listen to keyboard event (keys are defined in the store)
  onKeyboard(store.getPlayer);

  // Main game loop
  interval = setInterval(updateCanvas, 10);
});

// Stop loop and reset store properties
onUnmounted(() => {
  clearInterval(interval);
  store.$reset();
});

// ==============================
// Functions
// ==============================
function updateCanvas() {
  if ( !pause_loop.value ) {

    socket.value.on("player_position_x", data => {
      store.game.players.player.position.x = data
    })

    socket.value.on("player_position_y", data => {
      store.game.players.player.position.y = data
    })

    socket.value.on("player_velocity_x", data => {
      store.game.players.player.velocity.x = data
    })

    socket.value.on("player_velocity_y", data => {
      store.game.players.player.velocity.y = data
    })

    socket.value.on("player_state", data => {
      store.game.players.player.state = data
    })
    
    // Draw background and decorations
    drawBackground();
    drawDecoration({ 
      obj: shop,
      x_pos: 1000,
      y_pos: 250,
      scale: 3,
      speed: 15 
    });

    // Draw the players (handle: gravity, attackBox, jumping, left/right, screen borders,)
    drawPlayer({ user: store.getPlayer });

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
  if (detectCollision(player, enemy) && player.canAttack && time != "timeout") {
    player.canAttack = false;
    enemy.state = "hit";
    if (enemy.health >= player.strenght) {
      enemy.health -= player.strenght;
    } else {
      enemy.health = 0;
    }
  }

  if (detectCollision(enemy, player) && enemy.canAttack && time != "timeout") {
    enemy.canAttack = false;
    player.state = "hit";
    if (player.health >= enemy.strenght) {
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
  socket.value.emit('change_player_position_y', user.position.y += user.velocity.y);

  // Show animations
  if (user.state == "attacking") {
    // drawAttackBox();
    drawAnimation({ user, animation: user.animation.attack, speed: 10, idle_after: true });
  } else if (user.state == "running") {
    drawAnimation({ user, animation: user.animation.run });
  } else if (user.state == "jumping") {
    drawAnimation({ user, animation: user.animation.jump });
  } else if (user.state == "falling") {
    drawAnimation({ user, animation: user.animation.fall });
  } else if (user.state == "dead") {
    drawAnimation({ user, animation: user.animation.death, stop_after: true });
  } else if (user.state == "hit") {
    drawAnimation({ user, animation: user.animation.hit, speed: 20, idle_after: true });
  } else {
    drawAnimation({ user, animation: user.animation.idle });
  }

  // Handle attackBox position while user is moving
  handleAttackBox(user);

  // Handle jumping behaviour
  if (user.position.y + user.height + user.velocity.y >= 690) {
    socket.value.emit('change_player_velocity_y', 0);
    
  } else {
    socket.value.emit('change_player_velocity_y', user.velocity.y += user.gravity);
  }

  // Switch between animations
  if (user.velocity.y < 0) {
    socket.value.emit('change_player_state', 'jumping');
  } else if (
    user.velocity.y > 0 &&
    user.position.y < 535 &&
    user.state != "running"
  ) {
    socket.value.emit('change_player_state', 'falling');
  } else if (
    user.state != "running" &&
    user.state != "jumping" &&
    user.state != "attacking" &&
    user.state != "hit"
  ) {
    socket.value.emit('change_player_state', 'idle');
  }

  if (user.health <= 0) {
    socket.value.emit('change_player_state', 'dead');
  }

  // Do not go beyond the screen
  if (
    user.position.x + user.velocity.x >= 0 &&
    user.position.x + user.width + user.velocity.x <= window.innerWidth
  ) {
    socket.value.emit('change_player_position_x', user.position.x += user.velocity.x);
  } else {
    socket.value.emit('change_player_velocity_x', 0);
  }
}

/**
 * @param { Object } user
 * Handle keyboard event for a user
 */
function onKeyboard(user) {
  window.addEventListener("keydown", (e) => {
    if (user.isDead) {
      return;
    } else {
      if (e.key !== user.lastKey) {
        user.lastKey = e.key;
      }

      switch (user.lastKey) {
        // Left
        case user.keys.left:
          if (user.state !== "attacking") {
            socket.value.emit('change_player_velocity_x', -5);
            socket.value.emit('change_player_state', 'running');
          }
          break;
        // Right
        case user.keys.right:
          if (user.state !== "attacking") {
            socket.value.emit('change_player_velocity_x', 5 );
            socket.value.emit('change_player_state', 'running');
          }
          break;
        // Up
        case user.keys.up:
          if (user.position.y > window.innerHeight / 2) {
            socket.value.emit('change_player_velocity_y', -20);
          }
          
          break;
        // Attack
        case user.keys.attack:
          if (user.state !== "running") {
            socket.value.emit('change_player_state', 'attacking');
          }
          break;
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    if (user.isDead) {
      return;
    } else {
      if (e.key !== user.lastKey) {
        user.lastKey = e.key;
      }
      switch (user.lastKey) {
        // Left
        case user.keys.left:
          socket.value.emit('change_player_velocity_x', 0);
          socket.value.emit('change_player_state', 'idle');
          break;
        // Right
        case user.keys.right:
          socket.value.emit('change_player_velocity_x', 0);
          socket.value.emit('change_player_state', 'idle');
          break;
      }
    }
  });
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
 * 
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
 * 
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
    obj.width / obj.max_frames,
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
    animation.width / animation.total,
    animation.height,
    user.position.x - 280,
    user.position.y - 280,
    (animation.width / animation.total) * 3,
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
          socket.value.emit('change_player_state', 'idle');
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
