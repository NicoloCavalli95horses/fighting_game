<template>
  <HealthBar />
  <div class="full-flex top-12">
    <canvas :width="store.window.width" :height="store.window.height"></canvas>
  </div>
</template>

<script setup>
// ==============================
// Imports
// ==============================
import { onMounted } from "@vue/runtime-core";
import { Store } from "@/stores/store";
import HealthBar from "../components/HealthBar.vue";
import { 
  draw,
  detectCollision,
  handleKeyboardEvents,
  setDirection,
} from "../composables/utils/draw_utils.js";


// ==============================
// Variables
// ==============================
const store = Store();

// Canvas images
const background = new Image();
background.src = 'src/assets/img/background/background.png';
// const shop = new Image();
// shop.src = 'src/assets/img/decorations/shop.png';
// let shop_width = 708;
// let shop_height = 128;
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
  ctx.drawImage(background, 0, 0);
  // ctx.drawImage(shop(), 650, 193, shop_width*2.5, shop_height*2.5);

  // Draw the players (handle: gravity, attackBox, jumping, left/right, screen borders,)
  draw(ctx, store.game.players.player);
  draw(ctx, store.game.players.enemy);

  // Move the attackBox in order to make the players always face each other
  setDirection(store.game.players.player, store.game.players.enemy);

  // Handle collisions and subtract health 
  if (detectCollision(store.game.players.player, store.game.players.enemy) && store.game.players.player.isAttacking) {
    store.game.players.player.isAttacking = false;
    store.game.players.enemy.health -= 10;
  }

  if (detectCollision(store.game.players.enemy, store.game.players.player) && store.game.players.enemy.isAttacking) {
    store.game.players.enemy.isAttacking = false;
    store.game.players.player.health -= 10;
  }
}

// Listen to keyboard event (keys are defined in the store)
handleKeyboardEvents(store.game.players.enemy);
handleKeyboardEvents(store.game.players.player);
</script>

<style lang="scss" scoped>

</style>