<template>
  <Winner />
  <HealthBar />
  <canvas id="canvas" />
</template>

<script setup>
// ==============================
// Imports
// ==============================
import {
  onMounted,
  onUpdated,
  onUnmounted,
  watch,
  ref,
} from "@vue/runtime-core";
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
let interval = null;
let frame = 0; // Track canvas frame iteration
const pause_loop = ref();

// ==============================
// Props
// ==============================
const props = defineProps({
  isOnline: Boolean,
});

// const emits = defineEmits(["update"]);

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

<style lang="scss" scoped>
#canvas {
  width: 100%;
}
</style>
