<template>
  <Winner />
  <HealthBar />
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
let frame = 0; // Track canvas frame iteration
const pause_loop = ref();

// ==============================
// Props
// ==============================
const props = defineProps({
  isOnline: Boolean,
});


// ==============================
// Life cycle
// ==============================
onMounted(() => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Listen to keyboard event (keys are defined in the store)
  handleKeyboardEvents(store.game.players.player);

  if ( !props.isOnline ) {
    handleKeyboardEvents(store.game.players.enemy);
  }
  interval = setInterval(updateCanvas, store.game.settings.frameRate, ctx);
});

onUnmounted(() => {
  clearInterval(interval);
  store.$reset();
});

// ==============================
// Functions
// ==============================
function updateCanvas(ctx) {
  if (!pause_loop.value) {

    // Set canvas background
    drawBackground(ctx, store.window);
    drawShop(ctx, frame);

    // Draw the players (handle: gravity, attackBox, jumping, left/right, screen borders,)
    draw(ctx, store.game.players.player, frame, store.window);
    draw(ctx, store.game.players.enemy, frame, store.window);

    // Move the attackBox in order to make the players always face each other
    setDirection(store.game.players.player, store.game.players.enemy);

    // Handle collisions and subtract health
    reactToCollision(
      store.game.players.player,
      store.game.players.enemy,
      store.game.settings.fightTime
    );
    reactToCollision(
      store.game.players.enemy,
      store.game.players.player,
      store.game.settings.fightTime
    );

    frame++;
  }
}

function reactToCollision(player, enemy, time) {
  if (detectCollision(player, enemy) && player.canAttack && time != "timeout") {
    player.canAttack = false;
    enemy.state = "hit";
    if (enemy.health >= player.strenght) {
      enemy.health -= player.strenght;
    } else {
      enemy.health = 0;
    }
  }
}

function draw(ctx, user, frame) {
  // Apply gravity
  user.position.y += user.velocity.y;

  // Show animations
  if (user.state == "attacking") {
    // ctx.fillRect(
    //   user.attackBox.position.x,
    //   user.attackBox.position.y,
    //   user.attackBox.width,
    //   user.attackBox.height
    // );
    drawAnimation(ctx, user, user.animation.attack, frame, 10, true);
  } else if (user.state == "running") {
    drawAnimation(ctx, user, user.animation.run, frame);
  } else if (user.state == "jumping") {
    drawAnimation(ctx, user, user.animation.jump, frame);
  } else if (user.state == "falling") {
    drawAnimation(ctx, user, user.animation.fall, frame);
  } else if (user.state == "dead") {
    drawOneTimeAnimation(ctx, user, user.animation.death, frame);
  } else if (user.state == "hit") {
    drawAnimation(ctx, user, user.animation.hit, frame, 20, true);
  } else {
    drawAnimation(ctx, user, user.animation.idle, frame);
  }

  // Handle attackBox position while user is moving
  handleAttackBox(user);

  // Handle jumping behaviour
  if (user.position.y + user.height + user.velocity.y >= 690) {
    user.velocity.y = 0;
  } else {
    user.velocity.y += user.gravity;
  }

  // Switch between animations
  if (user.velocity.y < 0) {
    user.state = "jumping";
  } else if (
    user.velocity.y > 0 &&
    user.position.y < 535 &&
    user.state != "running"
  ) {
    user.state = "falling";
  } else if (
    user.state != "running" &&
    user.state != "jumping" &&
    user.state != "attacking" &&
    user.state != "hit"
  ) {
    user.state = "idle";
  }

  if (user.health <= 0) {
    user.state = "dead";
  }

  // Do not go beyond the screen
  if (
    user.position.x + user.velocity.x >= 0 &&
    user.position.x + user.width + user.velocity.x <= window.innerWidth
  ) {
    user.position.x += user.velocity.x;
  } else {
    user.velocity.x = 0;
  }
}

function handleKeyboardEvents(user) {
  window.addEventListener("keydown", (e) => {
    if (user.isDead) {
      return;
    } else {
      if (e.key !== user.lastKey) user.lastKey = e.key;

      switch (user.lastKey) {
        // Left
        case user.keys.left:
          if (user.state !== "attacking") {
            user.state = "running";
            user.velocity.x = -5;
          }
          break;
        // Right
        case user.keys.right:
          if (user.state !== "attacking") {
            user.state = "running";
            user.velocity.x = 5;
          }
          break;
        // Up
        case user.keys.up:
          if (user.position.y > window.innerHeight / 2) user.velocity.y = -20;
          break;
        // Attack
        case user.keys.attack:
          if (user.state !== "running") {
            user.state = "attacking";
          }
          break;
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    if (user.isDead) {
      return;
    } else {
      if (e.key !== user.lastKey) user.lastKey = e.key;
      switch (user.lastKey) {
        // Left
        case user.keys.left:
          user.state = "idle";
          user.velocity.x = 0;
          break;
        // Right
        case user.keys.right:
          user.state = "idle";
          user.velocity.x = 0;
          break;
      }
    }
  });
}

function setDirection(player, enemy) {
  // players always have to look at each other
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

function detectCollision(player, enemy) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.state == "attacking"
  );
}

function handleAttackBox(user) {
  user.attackBox.position.x = user.position.x + user.attackBox.offset;
  user.attackBox.position.y = user.position.y;
}

//===================================================
// ANIMATIONS
// ==================================================

// ====================  SHOP =======================

const shop = new Image(); // Create shop image()
shop.src = "src/assets/img/decorations/shop.png";
let SHOP_WIDTH = 708;
let SHOP_HEIGHT = 128;
let TOTAL_SHOP_FRAME = 6;
let i = 1;

function drawShop(ctx, frame) {
  ctx.drawImage(
    shop,
    i * (SHOP_WIDTH / TOTAL_SHOP_FRAME), // Cropping X (each iteration, scroll horizontally by an image frame)
    0, // Cropping Y (remain the same)
    SHOP_WIDTH / TOTAL_SHOP_FRAME,
    SHOP_HEIGHT,
    1000, // X position on the canvas of the whole image
    250, // Y position on the canvas of the whole image
    (SHOP_WIDTH / TOTAL_SHOP_FRAME) * 3, // WIDTH of the whole image
    SHOP_HEIGHT * 3 // HEIGHT of the whole image
  );

  if (frame % 15 === 0) {
    // Every 10 ctx frame, perform an iteration ( i + 1)
    i =
      i == TOTAL_SHOP_FRAME - 1 // Restart the iteration if i > TOTAL_SHOP_FRAME
        ? 1
        : i + 1;
  }
}

// ================== BACKGROUND ====================

const background = new Image(); // Create background image()
background.src = "src/assets/img/background/background.png";

function drawBackground(ctx) {
  ctx.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);
}

// =================== ANIMATION =====================

function drawAnimation(
  ctx,
  user,
  animation,
  frame,
  speed = 15,
  one_animation_then_idle = false
) {
  animation.image.src = user.mirror
    ? animation.src + "_rev.png"
    : animation.src + ".png";

  ctx.drawImage(
    animation.image,
    animation.i * (animation.width / animation.total),
    0,
    animation.width / animation.total,
    animation.height,
    user.position.x - 280,
    user.position.y - 280,
    (animation.width / animation.total) * 3,
    animation.height * 3
  );

  if (frame % speed === 0) {
    if (!one_animation_then_idle) {
      animation.i = animation.i == animation.total - 1 ? 1 : animation.i + 1;
    } else {
      if (animation.i == animation.total - 1) {
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

function drawOneTimeAnimation(ctx, user, animation, frame, speed = 15) {
  animation.image.src = animation.src + ".png";

  ctx.drawImage(
    animation.image,
    animation.i * (animation.width / animation.total),
    0,
    animation.width / animation.total,
    animation.height,
    user.position.x - 330,
    user.position.y - 255,
    (animation.width / animation.total) * 3.5,
    animation.height * 3.5
  );

  if (frame % speed === 0) {
    if (animation.i == animation.total - 1) {
      return;
    } else {
      animation.i = animation.i + 1;
    }
  }
}

// ==============================
// Watcher
// ==============================
watch(
  () => store.game.settings.pause,
  () => {
    pause_loop.value = store.game.settings.pause ? true : false;
  }
);
</script>
