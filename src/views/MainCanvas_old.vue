<template>
  <HealthBar />
  <div class="full-flex">
    <canvas class="canvas"></canvas>
  </div>
</template>

<script setup>
// ==============================
// Imports
// ==============================
import { onMounted } from "@vue/runtime-core";
import { Sprite } from "../composables/classes/Sprite.js";
import { useStore } from "@/stores/store";
import HealthBar from "../components/HealthBar.vue";

// ==============================
// Variables
// ==============================
const store = useStore();
const WIDTH = 1080;
const HEIGHT = 720;
const keys = {
  a: {},
  d: {},
  w: {},
  ArrowLeft: {},
  ArrowRight: {},
  ArrowUp: {},
};

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  setInterval(updateCanvas, 10, ctx);
});

const player = new Sprite({
  position: {
    x: 10,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  color: "red",
  health: 100,
});

const enemy = new Sprite({
  position: {
    x: WIDTH - 60, // width: 50 + 10 padding
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  color: "blue",
  health: 100,
});

// ==============================
// Functions
// ==============================

function updateCanvas(c) {
  // Clean the canvas and reset velocity
  c.fillStyle = "black";
  c.fillRect(0, 0, WIDTH, HEIGHT);
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Listent to key pressed events
  if (keys.a.pressed && player.lastKey == "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey == "d") {
    player.velocity.x = 5;
  }

  if (keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight") {
    enemy.velocity.x = 5;
  }

  // Detect for collisions
  if (detectCollision({ rect1: player, rect2: enemy }) && player.isAttacking) {
    player.isAttacking = false;
    store.decreaseLife("enemy");
  }

  if (detectCollision({ rect1: enemy, rect2: player }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    store.decreaseLife("player");
  }

  setDirection({ rect1: player, rect2: enemy});

  // Update position
  player.update(c);
  enemy.update(c);
}

function detectCollision({ rect1, rect2 }) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height &&
    rect1.isAttacking
  );
}

function setDirection({ rect1, rect2 }) {
  // players always have to look at each other
  rect1.position.x >= rect2.position.x
    ? rect1.attackBox.offset.x = -50
    : rect1.attackBox.offset.x = 0;
  
  rect2.position.x >= rect1.position.x 
    ? rect2.attackBox.offset.x = -50
    : rect2.attackBox.offset.x = 0;
}

// ==============================
// Window events
// ==============================

window.addEventListener("keydown", (e) => {
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
      player.position.y > 565 && player.position.y < 575
        ? (player.velocity.y = -20)
        : (player.velocity.y += player.gravity);
      break;
    case " ":
      player.attack();
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
      enemy.position.y > 565 && enemy.position.y < 575
        ? (enemy.velocity.y = -20)
        : (enemy.velocity.y += enemy.gravity);
      break;
    case "Insert":
      enemy.attack();
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
    case "w":
      keys.w.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});
</script>

<style scoped lang="scss"></style>
