<template>
  <Winner />
  <HealthBar />
  <canvas :width="store.window.width" :height="store.window.height"></canvas>
</template>

<script setup>
// ==============================
// Imports
// ==============================
import { onMounted, computed } from "@vue/runtime-core";
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

// Canvas images
let frame = 0;                   // Track canvas frame iteration

// ==============================
// Life cycle
// ==============================

onMounted(() => {  
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = store.window.width;
  canvas.height = store.window.height;

  setInterval(updateCanvas, 10, ctx);
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
  if (detectCollision(store.game.players.player, store.game.players.enemy) && store.game.players.player.canAttack ) {
    store.game.players.player.canAttack = false;
    store.game.players.enemy.state = 'hit';
    if ( store.game.players.enemy.health >= store.game.players.player.strenght ) {
      store.game.players.enemy.health -= store.game.players.player.strenght;
    } else {
      store.game.players.enemy.health = 0;
    }
  }

  if (detectCollision(store.game.players.enemy, store.game.players.player) && store.game.players.enemy.canAttack) {
    store.game.players.enemy.canAttack = false;
    store.game.players.player.state = 'hit';
    if ( store.game.players.player.health >= store.game.players.enemy.strenght ) {
      store.game.players.player.health -= store.game.players.enemy.strenght;
    } else {
      store.game.players.player.health = 0;
    }
  }

  frame ++
}

// Listen to keyboard event (keys are defined in the store)
handleKeyboardEvents(store.game.players.enemy);
handleKeyboardEvents(store.game.players.player);

</script>

<style lang="scss" scoped>
</style>