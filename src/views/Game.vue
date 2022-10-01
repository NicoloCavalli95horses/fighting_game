<template>
  <Winner />
  <HealthBar />
  <canvas
    :width="store.window.width"
    :height="store.window.height"
    id="canvas"
  />
</template>

<script setup>
// ==============================
// Imports
// ==============================
import { onMounted, computed, onUnmounted } from "@vue/runtime-core";
import { Store } from "@/stores/store";
import HealthBar from "../components/HealthBar.vue";
import Winner from "../components/Winner.vue";
import {
  draw,
  detectCollision,
  drawShop,
  drawBackground,
  handleKeyboardEvents,
  setDirection,
} from "../composables/utils/draw_utils.js";

// ==============================
// Variables
// ==============================
const store = Store();
let frame = 0; // Track canvas frame iteration

// ==============================
// Life cycle
// ==============================

onMounted(() => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = store.window.width;
  canvas.height = store.window.height;

  setInterval(updateCanvas, store.game.settings.frameRate, ctx);
});

onUnmounted(() => {
  store.$reset();
});

// ==============================
// Functions
// ==============================

function updateCanvas(ctx) {
  // Set canvas background
  drawBackground(ctx, store.window);
  drawShop(ctx, frame);

  // Draw the players (handle: gravity, attackBox, jumping, left/right, screen borders,)
  draw(ctx, store.game.players.player, frame, store.window);
  draw(ctx, store.game.players.enemy, frame, store.window);

  // Move the attackBox in order to make the players always face each other
  setDirection(store.game.players.player, store.game.players.enemy);

  // Handle collisions and subtract health
  reactToCollision(store.game.players.player, store.game.players.enemy);
  reactToCollision(store.game.players.enemy, store.game.players.player);

  frame++;
}

// Listen to keyboard event (keys are defined in the store)
handleKeyboardEvents(store.game.players.enemy);
handleKeyboardEvents(store.game.players.player);

function reactToCollision(player, enemy) {
  if (detectCollision(player, enemy) && player.canAttack) {
    player.canAttack = false;
    enemy.state = "hit";
    if (enemy.health >= player.strenght) {
      enemy.health -= player.strenght;
    } else {
      enemy.health = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  width: 100%;
}
</style>
